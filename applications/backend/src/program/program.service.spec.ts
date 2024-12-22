import { Test, TestingModule } from '@nestjs/testing';
import { ProgramService } from './program.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program } from './program.schema';

describe('ProgramService', () => {
  let service: ProgramService;
  let model: Model<Program>;

  const mockProgram = {
    _id: '6767203bdaba607b24056877',
    title: 'Test Program',
    description: 'Test description',
    duration: '3 months',
    goals: ['Goal 1', 'Goal 2'],
    photos: ['photo1.jpg', 'photo2.jpg'],
    videos: ['video1.mp4', 'video2.mp4'],
    save: jest.fn().mockResolvedValue(this),
  } as unknown as Program;

  const mockModel = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    find: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([mockProgram]),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(id === mockProgram._id ? mockProgram : null),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({
        ...mockProgram,
        ...updateData,
      }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(id === mockProgram._id ? mockProgram : null),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService,
        {
          provide: getModelToken(Program.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ProgramService>(ProgramService);
    model = module.get<Model<Program>>(getModelToken(Program.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a program', async () => {
    const programData = {
      title: 'Test Program',
      description: 'Test description',
      duration: '3 months',
      goals: ['Goal 1', 'Goal 2'],
      photos: ['photo1.jpg', 'photo2.jpg'],
      videos: ['video1.mp4', 'video2.mp4'],
    };

    const result = await service.createProgram(programData);

    expect(mockModel.create).toHaveBeenCalledWith(programData);
    expect(result).toMatchObject(programData);
  });

  it('should return all programs', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockProgram]);
  });

  it('should find a program by ID', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const result = await service.findById(id);

    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockProgram);
  });

  it('should update a program', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const updateData = { title: 'Updated Program' };

    const result = await service.updateProgram(id, updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...mockProgram, title: 'Updated Program' });
  });

  it('should delete a program', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const result = await service.deleteProgram(id);

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockProgram);
  });
});
