import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

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
    save: jest.fn().mockResolvedValue(this),
  } as unknown as User;

  const mockModel = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    find: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([mockUser]),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(id === mockUser._id.toString() ? mockUser : null),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({
        ...mockUser,
        ...updateData,
      }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(id === mockUser._id.toString() ? mockUser : null),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const result = await service.createUser(userData);

    expect(mockModel.create).toHaveBeenCalledWith(userData);
    expect(result).toMatchObject(userData);
  });

  it('should return all users', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockUser]);
  });

  it('should find a user by ID', async () => {
    const id = mockUser._id.toString();

    const result = await service.findById(id);

    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockUser);
  });

  it('should update a user by ID', async () => {
    const id = mockUser._id.toString();
    const updateData = { name: 'Jane Doe' };

    const result = await service.updateUser(id, updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...mockUser, name: 'Jane Doe' });
  });

  it('should delete a user by ID', async () => {
    const id = mockUser._id.toString();

    const result = await service.deleteUser(id);

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockUser);
  });
});
