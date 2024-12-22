import { Test, TestingModule } from '@nestjs/testing';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { Program } from './program.schema';

describe('ProgramController', () => {
  let controller: ProgramController;
  let service: ProgramService;

  const mockProgram = {
    _id: '6767203bdaba607b24056877',
    title: 'Test Program',
    description: 'Test description',
    duration: '3 months',
    goals: ['Goal 1', 'Goal 2'],
    photos: ['photo1.jpg', 'photo2.jpg'],
    videos: ['video1.mp4', 'video2.mp4'],
  } as unknown as Program;

  const mockService = {
    createProgram: jest.fn().mockResolvedValue(mockProgram),
    findAll: jest.fn().mockResolvedValue([mockProgram]),
    findById: jest.fn().mockResolvedValue(mockProgram),
    updateProgram: jest.fn().mockResolvedValue({
      ...mockProgram,
      title: 'Updated Program',
    }),
    deleteProgram: jest.fn().mockResolvedValue(mockProgram),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramController],
      providers: [
        {
          provide: ProgramService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProgramController>(ProgramController);
    service = module.get<ProgramService>(ProgramService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    const result = await controller.createProgram(programData);

    expect(service.createProgram).toHaveBeenCalledWith(programData);
    expect(result).toEqual(mockProgram);
  });

  it('should return all programs', async () => {
    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProgram]);
  });

  it('should find a program by ID', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const result = await controller.findById(id);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockProgram);
  });

  it('should update a program', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const updateData = { title: 'Updated Program' };

    const result = await controller.updateProgram(id, updateData);

    expect(service.updateProgram).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual({ ...mockProgram, title: 'Updated Program' });
  });

  it('should delete a program', async () => {
    const id = mockProgram._id.toString(); // Convert _id to a string explicitly
    const result = await controller.deleteProgram(id);

    expect(service.deleteProgram).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockProgram);
  });
});
