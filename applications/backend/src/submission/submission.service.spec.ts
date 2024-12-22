import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionService } from './submission.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Submission } from './submission.schema';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let model: Model<Submission>;

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
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockSubmission),
    find: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([mockSubmission]),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest.fn().mockResolvedValue(mockSubmission),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({ ...mockSubmission, ...updateData }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest.fn().mockResolvedValue(mockSubmission),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionService,
        {
          provide: getModelToken(Submission.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
    model = module.get<Model<Submission>>(getModelToken(Submission.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a submission', async () => {
    const result = await service.createSubmission(mockSubmission);
    expect(mockModel.create).toHaveBeenCalledWith(mockSubmission);
    expect(result).toEqual(mockSubmission);
  });

  it('should return all submissions', async () => {
    const result = await service.findAll();
    expect(mockModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([mockSubmission]);
  });

  it('should find a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const result = await service.findById(id);
    expect(mockModel.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSubmission);
  });

  it('should find submissions by project ID', async () => {
    const projectId = mockSubmission.projectId.toString();
    const result = await service.findByProject(projectId);
    expect(mockModel.find).toHaveBeenCalledWith({ projectId });
    expect(result).toEqual([mockSubmission]);
  });

  it('should update a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const updateData = { type: 'updated' };
    const result = await service.updateSubmission(id, updateData);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, {
      new: true,
    });
    expect(result).toEqual({ ...mockSubmission, ...updateData });
  });

  it('should delete a submission by ID', async () => {
    const id = mockSubmission.projectId.toString();
    const result = await service.deleteSubmission(id);
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockSubmission);
  });
});
