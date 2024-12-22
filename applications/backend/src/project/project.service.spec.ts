import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getModelToken } from '@nestjs/mongoose';
import { ElasticSearchService } from '../elastic.service';
import { Model, Types } from 'mongoose';
import { Project } from './project.schema';

describe('ProjectService', () => {
  let service: ProjectService;
  let model: Model<Project>;
  let elasticService: ElasticSearchService;

  const mockProject = {
    _id: new Types.ObjectId(),
    title: 'Test Project',
    description: 'Test Description',
    status: 'open',
    tags: ['tag1', 'tag2'],
    skillsNeeded: ['skill1', 'skill2'],
    createdBy: new Types.ObjectId(),
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockProject),
    find: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([mockProject]),
    })),
    findById: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockProject._id.toString() ? mockProject : null,
        ),
    })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, updateData) => ({
      exec: jest.fn().mockResolvedValue({ ...mockProject, ...updateData }),
    })),
    findByIdAndDelete: jest.fn().mockImplementation((id) => ({
      exec: jest
        .fn()
        .mockResolvedValue(
          id === mockProject._id.toString() ? mockProject : null,
        ),
    })),
  };

  const mockElasticSearchService = {
    indexDocument: jest.fn(),
    deleteDocument: jest.fn(),
    bulkIndex: jest.fn(),
    search: jest.fn().mockResolvedValue({ hits: { hits: [] } }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getModelToken(Project.name),
          useValue: mockModel,
        },
        {
          provide: ElasticSearchService,
          useValue: mockElasticSearchService,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    model = module.get<Model<Project>>(getModelToken(Project.name));
    elasticService = module.get<ElasticSearchService>(ElasticSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add other test cases here
});
