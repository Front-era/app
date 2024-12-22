import { Test, TestingModule } from '@nestjs/testing';
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { Types } from 'mongoose';

describe('InterestController', () => {
  let controller: InterestController;
  let service: InterestService;

  const mockInterest = {
    userId: new Types.ObjectId(),
    projectId: new Types.ObjectId(),
    status: 'pending',
    timestamp: new Date(),
  };

  const mockService = {
    createInterest: jest.fn().mockResolvedValue(mockInterest),
    findAll: jest.fn().mockResolvedValue([mockInterest]),
    findById: jest.fn().mockResolvedValue(mockInterest),
    updateInterest: jest.fn().mockResolvedValue(mockInterest),
    deleteInterest: jest.fn().mockResolvedValue(mockInterest),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestController],
      providers: [
        {
          provide: InterestService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<InterestController>(InterestController);
    service = module.get<InterestService>(InterestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an interest', async () => {
    const interestData = {
      userId: new Types.ObjectId(),
      projectId: new Types.ObjectId(),
    };

    const result = await controller.createInterest(interestData);

    expect(service.createInterest).toHaveBeenCalledWith(interestData);
    expect(result).toEqual(mockInterest);
  });

  it('should return all interests', async () => {
    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockInterest]);
  });

  it('should return an interest by id', async () => {
    const id = new Types.ObjectId().toString();

    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockInterest);
  });

  it('should update an interest by id', async () => {
    const id = new Types.ObjectId().toString();
    const updateData = { status: 'approved' };

    const result = await controller.updateInterest(id, updateData);

    expect(service.updateInterest).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(mockInterest);
  });

  it('should delete an interest by id', async () => {
    const id = new Types.ObjectId().toString();

    const result = await controller.deleteInterest(id);

    expect(service.deleteInterest).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockInterest);
  });
});
