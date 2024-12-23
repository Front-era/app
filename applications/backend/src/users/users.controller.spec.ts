import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Users } from './users.schema';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findAll: jest.fn(() => Promise.resolve([])),
    findOne: jest.fn((id) => Promise.resolve({ userId: id, fullName: 'John Doe' })),
    create: jest.fn((dto) => Promise.resolve({ ...dto, userId: '123' })),
    update: jest.fn((id, dto) => Promise.resolve({ userId: id, ...dto })),
    delete: jest.fn((id) => Promise.resolve({ userId: id, deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: getModelToken(Users.name), useValue: {} },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await usersController.findAll();
      expect(result).toEqual([]);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const userId = '123';
      const result = await usersController.findOne(userId);
      expect(result).toEqual({ userId, fullName: 'John Doe' });
      expect(usersService.findOne).toHaveBeenCalledWith(userId);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto = {
        userId:"1234",
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        colonyId: 'colony1',
      };
      const result = await usersController.create(dto);
      expect(result).toEqual({ ...dto, userId: '123' });
      expect(usersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '123';
      const dto = { fullName: 'John Updated' };
      const result = await usersController.update(userId, dto);
      expect(result).toEqual({ userId, ...dto });
      expect(usersService.update).toHaveBeenCalledWith(userId, dto);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '123';
      const result = await usersController.delete(userId);
      expect(result).toEqual({ userId, deleted: true });
      expect(usersService.delete).toHaveBeenCalledWith(userId);
    });
  });
});
