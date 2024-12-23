import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  const mockUser = {
    _id: '123',
    userId: 'user-1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    colonyId: 'colony1',
  };

  beforeEach(async () => {
    mockUserModel = {
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockUser]),
      }),
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockUser, fullName: 'Updated Name' }),
      }),
      findByIdAndDelete: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      }),
      create: jest.fn().mockImplementation((dto) => ({
        ...dto,
        save: jest.fn().mockResolvedValue({ ...mockUser, ...dto }),
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Users.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual([mockUser]);
      expect(mockUserModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user = await service.findOne('123');
      expect(user).toEqual(mockUser);
      expect(mockUserModel.findById).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('123')).rejects.toThrow(
        new NotFoundException('User with ID 123 not found'),
      );
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const dto = {
        userId: 'user-2',
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        fullName: 'Jane Smith',
        colonyId: 'colony2',
      };

      const newUser = await service.create(dto);
      expect(newUser).toEqual({ ...mockUser, ...dto });
      expect(mockUserModel.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const dto = { fullName: 'Updated Name' };
      const updatedUser = await service.update('123', dto);
      expect(updatedUser).toEqual({ ...mockUser, fullName: 'Updated Name' });
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        dto,
        { new: true },
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserModel.findByIdAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update('123', { fullName: 'Updated Name' })).rejects.toThrow(
        new NotFoundException('User with ID 123 not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete and return the deleted user', async () => {
      const deletedUser = await service.delete('123');
      expect(deletedUser).toEqual(mockUser);
      expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.delete('123')).rejects.toThrow(
        new NotFoundException('User with ID 123 not found'),
      );
    });
  });
});
