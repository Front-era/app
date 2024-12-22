import { Test, TestingModule } from '@nestjs/testing';
import { InterestService } from './interest.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Interest } from './interest.schema';

describe('InterestService', () => {
  let service: InterestService;
  let model: Model<Interest>;

  const mockInterest = {
    userId: new Types.ObjectId(),
    projectId: new Types.ObjectId(),
    status: 'pending',
    timestamp: new Date(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto), // Mock save method
    })),
    // Simulate `new` keyword for creating documents
    constructor: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    find: jest.fn().mockImplementation((query = {}) => ({
      exec: jest.fn().mockResolvedValue([mockInterest]),
    })),

    findById: jest.fn().mockImplementation((id) => ({
      exec: jest.fn().mockResolvedValue(mockInterest),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({
        ...mockInterest,
        ...updateData,
      }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest.fn().mockResolvedValue(mockInterest),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestService,
        {
          provide: getModelToken(Interest.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<InterestService>(InterestService);
    model = module.get<Model<Interest>>(getModelToken(Interest.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an interest', async () => {
    const interestData = {
      userId: new Types.ObjectId(),
      projectId: new Types.ObjectId(),
      status: 'pending',
    };

    const result = await service.createInterest(interestData);

    expect(mockModel.create).toHaveBeenCalledWith(interestData);
    expect(result).toMatchObject(interestData);
  });

  it('should return all interests', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalledWith({}); // Check for {}
    expect(result).toEqual([mockInterest]); // Ensure result matches mock data
  });

  it('should find an interest by id', async () => {
    const id = new Types.ObjectId().toString();
    const result = await service.findById(id);

    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockInterest);
  });

  it('should update an interest by id', async () => {
    const id = new Types.ObjectId().toString();
    const updateData = { status: 'approved' };

    const result = await service.updateInterest(id, updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({
      ...mockInterest,
      ...updateData,
    });
  });

  it('should delete an interest by id', async () => {
    const id = new Types.ObjectId().toString();

    const result = await service.deleteInterest(id);

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockInterest);
  });
});
