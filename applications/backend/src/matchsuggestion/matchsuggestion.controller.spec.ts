import { Test, TestingModule } from '@nestjs/testing';
import { MatchSuggestionController } from './matchsuggestion.controller';
import { MatchSuggestionService } from './matchsuggestion.service';
import { Types } from 'mongoose';

describe('MatchSuggestionController', () => {
  let controller: MatchSuggestionController;
  let service: MatchSuggestionService;

  const mockSuggestion = {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    projectSuggestions: [new Types.ObjectId()],
    teammateSuggestions: [new Types.ObjectId()],
  };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockSuggestion]),
    findByUser: jest.fn().mockResolvedValue([mockSuggestion]),
    findById: jest.fn().mockResolvedValue(mockSuggestion),
    createMatchSuggestion: jest.fn().mockResolvedValue(mockSuggestion),
    updateMatchSuggestion: jest.fn().mockResolvedValue(mockSuggestion),
    deleteMatchSuggestion: jest.fn().mockResolvedValue(mockSuggestion),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchSuggestionController],
      providers: [
        {
          provide: MatchSuggestionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MatchSuggestionController>(
      MatchSuggestionController,
    );
    service = module.get<MatchSuggestionService>(MatchSuggestionService);
  });

  it('should return all match suggestions', async () => {
    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockSuggestion]);
  });

  it('should find match suggestions by user', async () => {
    const userId = mockSuggestion.userId.toString();

    const result = await controller.findByUser(userId);

    expect(service.findByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual([mockSuggestion]);
  });

  it('should create a match suggestion', async () => {
    const suggestionData = {
      userId: new Types.ObjectId(),
      projectSuggestions: [new Types.ObjectId()],
      teammateSuggestions: [new Types.ObjectId()],
    };

    const result = await controller.createMatchSuggestion(suggestionData);

    expect(service.createMatchSuggestion).toHaveBeenCalledWith(suggestionData);
    expect(result).toEqual(mockSuggestion);
  });

  it('should find a match suggestion by id', async () => {
    const id = mockSuggestion._id.toString();

    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSuggestion);
  });

  it('should update a match suggestion', async () => {
    const id = mockSuggestion._id.toString();
    const updateData = { teammateSuggestions: [new Types.ObjectId()] };

    const result = await controller.updateMatchSuggestion(id, updateData);

    expect(service.updateMatchSuggestion).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(mockSuggestion);
  });

  it('should delete a match suggestion', async () => {
    const id = mockSuggestion._id.toString();

    const result = await controller.deleteMatchSuggestion(id);

    expect(service.deleteMatchSuggestion).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSuggestion);
  });
});
