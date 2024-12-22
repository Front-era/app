import { Test, TestingModule } from '@nestjs/testing';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { Types } from 'mongoose';

describe('ThreadController', () => {
  let controller: ThreadController;
  let service: ThreadService;

  const mockThread = {
    _id: new Types.ObjectId(),
    projectId: new Types.ObjectId(),
    participants: [new Types.ObjectId(), new Types.ObjectId()],
    title: 'Sample Thread',
    createdAt: new Date(),
  };

  const mockThreadService = {
    createThread: jest.fn().mockResolvedValue(mockThread),
    findAll: jest.fn().mockResolvedValue([mockThread]),
    findById: jest.fn().mockResolvedValue(mockThread),
    updateThread: jest
      .fn()
      .mockResolvedValue({ ...mockThread, title: 'Updated Thread' }),
    deleteThread: jest.fn().mockResolvedValue(mockThread),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadController],
      providers: [
        {
          provide: ThreadService,
          useValue: mockThreadService,
        },
      ],
    }).compile();

    controller = module.get<ThreadController>(ThreadController);
    service = module.get<ThreadService>(ThreadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a thread', async () => {
    const threadData = {
      projectId: new Types.ObjectId(),
      participants: [new Types.ObjectId()],
      title: 'New Thread',
    };

    const result = await controller.createThread(threadData);
    expect(service.createThread).toHaveBeenCalledWith(threadData);
    expect(result).toEqual(mockThread);
  });

  it('should return all threads', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockThread]);
  });

  it('should find a thread by ID', async () => {
    const id = mockThread._id.toString();
    const result = await controller.findById(id);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockThread);
  });

  it('should update a thread by ID', async () => {
    const id = mockThread._id.toString();
    const updateData = { title: 'Updated Thread' };

    const result = await controller.updateThread(id, updateData);
    expect(service.updateThread).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual({ ...mockThread, title: 'Updated Thread' });
  });

  it('should delete a thread by ID', async () => {
    const id = mockThread._id.toString();
    const result = await controller.deleteThread(id);
    expect(service.deleteThread).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockThread);
  });
});
