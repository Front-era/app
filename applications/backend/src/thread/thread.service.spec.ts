import { Test, TestingModule } from '@nestjs/testing';
import { ThreadService } from './thread.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Thread } from './thread.schema';

describe('ThreadService', () => {
  let service: ThreadService;
  let model: Model<Thread>;

  const mockThread = {
    _id: new Types.ObjectId(),
    projectId: new Types.ObjectId(),
    participants: [new Types.ObjectId(), new Types.ObjectId()],
    title: 'Sample Thread',
    createdAt: new Date(),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockThread),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockThread]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockThread),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue({ ...mockThread, title: 'Updated Thread' }),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockThread),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThreadService,
        {
          provide: getModelToken(Thread.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ThreadService>(ThreadService);
    model = module.get<Model<Thread>>(getModelToken(Thread.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a thread', async () => {
    const threadData = {
      projectId: new Types.ObjectId(),
      participants: [new Types.ObjectId()],
      title: 'New Thread',
    };

    const result = await service.createThread(threadData);
    expect(model.create).toHaveBeenCalledWith(threadData);
    expect(result).toEqual(mockThread);
  });

  it('should return all threads', async () => {
    const result = await service.findAll();
    expect(model.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockThread]);
  });

  it('should find a thread by ID', async () => {
    const id = mockThread._id.toString();
    const result = await service.findById(id);
    expect(model.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockThread);
  });

  it('should update a thread by ID', async () => {
    const id = mockThread._id.toString();
    const updateData = { title: 'Updated Thread' };

    const result = await service.updateThread(id, updateData);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...mockThread, title: 'Updated Thread' });
  });

  it('should delete a thread by ID', async () => {
    const id = mockThread._id.toString();
    const result = await service.deleteThread(id);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockThread);
  });
});
