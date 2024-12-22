import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Types } from 'mongoose';
import { Message } from './message.schema';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  const mockMessage = {
    _id: new Types.ObjectId(),
    threadId: new Types.ObjectId(),
    sender: new Types.ObjectId(),
    content: 'Test message',
    timestamp: new Date(),
    save: jest.fn(),
    $assertPopulated: jest.fn(),
    $clearModifiedPaths: jest.fn(),
    $clone: jest.fn(),
  } as unknown as Message;

  const mockService = {
    createMessage: jest.fn().mockResolvedValue(mockMessage),
    findAll: jest.fn().mockResolvedValue([mockMessage]),
    findById: jest.fn().mockResolvedValue(mockMessage),
    findByThread: jest.fn().mockResolvedValue([mockMessage]),
    updateMessage: jest.fn().mockResolvedValue({
      ...mockMessage,
      content: 'Updated message',
    }),
    deleteMessage: jest.fn().mockResolvedValue(mockMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const messageData = {
      threadId: new Types.ObjectId(),
      sender: new Types.ObjectId(),
      content: 'Test message',
    };

    const result = await controller.createMessage(messageData);

    expect(service.createMessage).toHaveBeenCalledWith(messageData);
    expect(result).toEqual(mockMessage);
  });

  it('should return all messages', async () => {
    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockMessage]);
  });

  it('should find a message by ID', async () => {
    const id = mockMessage._id.toString();

    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockMessage);
  });

  it('should find messages by thread ID', async () => {
    const threadId = mockMessage.threadId.toString();

    const result = await controller.findByThread(threadId);

    expect(service.findByThread).toHaveBeenCalledWith(threadId);
    expect(result).toEqual([mockMessage]);
  });

  it('should update a message by ID', async () => {
    const id = mockMessage._id.toString();
    const updateData = { content: 'Updated message' };

    const result = await controller.updateMessage(id, updateData);

    expect(service.updateMessage).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual({ ...mockMessage, content: 'Updated message' });
  });

  it('should delete a message by ID', async () => {
    const id = mockMessage._id.toString();

    const result = await controller.deleteMessage(id);

    expect(service.deleteMessage).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockMessage);
  });
});
