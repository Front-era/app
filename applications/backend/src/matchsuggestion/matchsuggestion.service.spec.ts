import { Test, TestingModule } from '@nestjs/testing';
import { MatchSuggestionService } from './matchsuggestion.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MatchSuggestion } from './matchsuggestion.schema';

describe('MatchSuggestionService', () => {
  let service: MatchSuggestionService;
  let model: Model<MatchSuggestion>;

  const mockSuggestion = {
    _id: new Types.ObjectId(),
    userId: new Types.ObjectId(),
    projectSuggestions: [new Types.ObjectId()],
    teammateSuggestions: [new Types.ObjectId()],
  };

  const mockModel = {
    find: jest.fn().mockImplementation((query) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          query.userId
            ? [mockSuggestion].filter(
                (suggestion) =>
                  suggestion.userId.toString() === query.userId.toString(),
              )
            : [mockSuggestion],
        ),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockSuggestion._id.toString() ? mockSuggestion : null,
        ),
    })),
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({ ...mockSuggestion, ...updateData }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockSuggestion._id.toString() ? mockSuggestion : null,
        ),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchSuggestionService,
        {
          provide: getModelToken(MatchSuggestion.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<MatchSuggestionService>(MatchSuggestionService);
    model = module.get<Model<MatchSuggestion>>(
      getModelToken(MatchSuggestion.name),
    );
  });

  it('should return all match suggestions', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockSuggestion]);
  });

  it('should find match suggestions by user', async () => {
    const userId = new Types.ObjectId().toString(); // Use string representation for consistency
    const mockSuggestion = {
      userId: userId, // Use string here
      projectSuggestions: [new Types.ObjectId().toString()],
      teammateSuggestions: [new Types.ObjectId().toString()],
    };

    // Update the mockModel to return results for the matching userId
    mockModel.find = jest.fn().mockImplementation((query) => ({
      exec: jest
        .fn()
        .mockResolvedValue(query.userId === userId ? [mockSuggestion] : []),
    }));

    const result = await service.findByUser(userId);

    // Check the correct call to find
    expect(mockModel.find).toHaveBeenCalledWith({ userId });
    expect(result).toEqual([mockSuggestion]);
  });

  it('should create a match suggestion', async () => {
    const suggestionData = {
      userId: new Types.ObjectId(),
      projectSuggestions: [new Types.ObjectId()],
      teammateSuggestions: [new Types.ObjectId()],
    };

    const result = await service.createMatchSuggestion(suggestionData);

    expect(mockModel.create).toHaveBeenCalledWith(suggestionData);
    expect(result).toMatchObject(suggestionData);
  });

  it('should find a match suggestion by id', async () => {
    const id = mockSuggestion._id.toString();

    const result = await service.findById(id);

    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSuggestion);
  });

  it('should update a match suggestion', async () => {
    const id = mockSuggestion._id.toString();
    const updateData = { teammateSuggestions: [new Types.ObjectId()] };

    const result = await service.updateMatchSuggestion(id, updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toMatchObject({ ...mockSuggestion, ...updateData });
  });

  it('should delete a match suggestion', async () => {
    const id = mockSuggestion._id.toString();

    const result = await service.deleteMatchSuggestion(id);

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSuggestion);
  });
});
