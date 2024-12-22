import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockProject = {
    _id: '1',
    title: 'Test Project',
    description: 'Test Description',
    status: 'open',
  };

  const mockService = {
    createProject: jest.fn().mockResolvedValue(mockProject),
    findAll: jest.fn().mockResolvedValue([mockProject]),
    findById: jest.fn().mockResolvedValue(mockProject),
    searchProjects: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add other test cases here
});
