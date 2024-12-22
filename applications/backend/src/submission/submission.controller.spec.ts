import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { Types } from 'mongoose';

describe('SubmissionController', () => {
  let controller: SubmissionController;
  let service: SubmissionService;

  const mockSubmission = {
    projectId: new Types.ObjectId(),
    submittedBy: new Types.ObjectId(),
    content: {
      description: 'A test submission',
      photo: 'photo_url',
      videoLinks: ['video_link'],
    },
    createdAt: new Date(),
    type: 'test',
  };

  const mockService = {
    createSubmission: jest.fn().mockResolvedValue(mockSubmission),
    findAll: jest.fn().mockResolvedValue([mockSubmission]),
    findById: jest.fn().mockResolvedValue(mockSubmission),
    findByProject: jest.fn().mockResolvedValue([mockSubmission]),
    updateSubmission: jest.fn().mockResolvedValue(mockSubmission),
    deleteSubmission: jest.fn().mockResolvedValue(mockSubmission),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionController],
      providers: [
        {
          provide: SubmissionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SubmissionController>(SubmissionController);
    service = module.get<SubmissionService>(SubmissionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a submission', async () => {
    const result = await controller.createSubmission(mockSubmission);
    expect(service.createSubmission).toHaveBeenCalledWith(mockSubmission);
    expect(result).toEqual(mockSubmission);
  });

  it('should return all submissions', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockSubmission]);
  });

  it('should return a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const result = await controller.findById(id);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSubmission);
  });

  it('should return submissions by project ID', async () => {
    const projectId = mockSubmission.projectId.toString();
    const result = await controller.findByProject(projectId);
    expect(service.findByProject).toHaveBeenCalledWith(projectId);
    expect(result).toEqual([mockSubmission]);
  });

  it('should update a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const updateData = { type: 'updated' };
    const result = await controller.updateSubmission(id, updateData);
    expect(service.updateSubmission).toHaveBeenCalledWith(id, updateData);
    expect(result).toEqual(mockSubmission);
  });

  it('should delete a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const result = await controller.deleteSubmission(id);
    expect(service.deleteSubmission).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSubmission);
  });
});
