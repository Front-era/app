import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { User } from './user.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    _id: new Types.ObjectId(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileInfo: {
      bio: 'Software Developer',
      skills: ['JavaScript', 'NestJS'],
      interests: ['Open Source', 'AI'],
      portfolio_links: ['https://github.com/johndoe'],
    },
    faction: 'Tech',
    projects: [new Types.ObjectId()],
  } as unknown as User;

  const mockService = {
    createUser: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    updateUser: jest.fn().mockResolvedValue({ ...mockUser, name: 'Jane Doe' }),
    deleteUser: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      profileInfo: {
        bio: 'Software Developer',
        skills: ['JavaScript', 'NestJS'],
        interests: ['Open Source', 'AI'],
        portfolio_links: ['https://github.com/johndoe'],
      },
    };

    const result = await controller.createUser(userData);

    expect(service.createUser).toHaveBeenCalledWith(userData);
    expect(result).toEqual(mockUser);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockUser]);
  });

  it('should find a user by ID', async () => {
    const id = mockUser._id.toString();

    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const id = mockUser._id.toString();
    const updateData = { name: 'Jane Doe' };

    const result = await controller.updateUser(id, updateData);

    expect(service.updateUser).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual({ ...mockUser, name: 'Jane Doe' });
  });

  it('should delete a user', async () => {
    const id = mockUser._id.toString();

    const result = await controller.deleteUser(id);

    expect(service.deleteUser).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockUser);
  });
});
