import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { Message } from './message.schema';
import { Model, Types } from 'mongoose';

describe('MessageService', () => {
  let service: MessageService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<Message>;

  const mockMessage = {
    _id: new Types.ObjectId(),
    threadId: new Types.ObjectId(),
    sender: new Types.ObjectId(),
    content: 'Test message',
    timestamp: new Date(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    find: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([mockMessage]),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockMessage._id.toString() ? mockMessage : null,
        ),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({ ...mockMessage, ...updateData }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockMessage._id.toString() ? mockMessage : null,
        ),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getModelToken(Message.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    model = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const messageData = {
      threadId: new Types.ObjectId(),
      sender: new Types.ObjectId(),
      content: 'Test message',
    };

    const result = await service.createMessage(messageData);

    expect(mockModel.create).toHaveBeenCalledWith(messageData);
    expect(result).toMatchObject(messageData);
  });

  it('should return all messages', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockMessage]);
  });

  it('should find a message by ID', async () => {
    const id = mockMessage._id.toString();
    const result = await service.findById(id);

    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockMessage);
  });

  it('should find messages by thread ID', async () => {
    const threadId = mockMessage.threadId.toString();
    const result = await service.findByThread(threadId);

    expect(mockModel.find).toHaveBeenCalledWith({ threadId });
    expect(result).toEqual([mockMessage]);
  });

  it('should update a message by ID', async () => {
    const id = mockMessage._id.toString();
    const updateData = { content: 'Updated content' };

    const result = await service.updateMessage(id, updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...mockMessage, ...updateData });
  });

  it('should delete a message by ID', async () => {
    const id = mockMessage._id.toString();

    const result = await service.deleteMessage(id);

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockMessage);
  });
});
