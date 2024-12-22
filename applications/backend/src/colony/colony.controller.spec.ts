import { Test, TestingModule } from '@nestjs/testing';
import { ColonyController } from './colony.controller';
import { ColonyService } from './colony.service';

describe('ColonyController', () => {
  let controller: ColonyController;
  let service: ColonyService;

  const mockService = {
    createColony: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    updateColony: jest.fn(),
    deleteColony: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColonyController],
      providers: [
        {
          provide: ColonyService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ColonyController>(ColonyController);
    service = module.get<ColonyService>(ColonyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createColony with the correct data', async () => {
    const colonyData = {
      title: 'Test Colony',
      url: 'test.com',
      category: 'test',
    };
    const result = { ...colonyData, _id: '1' };

    mockService.createColony.mockResolvedValue(result);
    const response = await controller.createColony(colonyData);

    expect(service.createColony).toHaveBeenCalledWith(colonyData);
    expect(response).toEqual(result);
  });

  it('should return all colonies', async () => {
    const result = [{ title: 'Colony1' }, { title: 'Colony2' }];
    mockService.findAll.mockResolvedValue(result);

    const response = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(response).toEqual(result);
  });

  it('should return a colony by id', async () => {
    const result = { title: 'Colony1', _id: '1' };
    mockService.findById.mockResolvedValue(result);

    const response = await controller.findById('1');
    expect(service.findById).toHaveBeenCalledWith('1');
    expect(response).toEqual(result);
  });

  it('should update a colony by id', async () => {
    const updateData = { title: 'Updated Colony' };
    const result = { title: 'Updated Colony', _id: '1' };

    mockService.updateColony.mockResolvedValue(result);
    const response = await controller.updateColony('1', updateData);

    expect(service.updateColony).toHaveBeenCalledWith('1', updateData);
    expect(response).toEqual(result);
  });

  it('should delete a colony by id', async () => {
    const result = { _id: '1', title: 'Deleted Colony' };

    mockService.deleteColony.mockResolvedValue(result);
    const response = await controller.deleteColony('1');

    expect(service.deleteColony).toHaveBeenCalledWith('1');
    expect(response).toEqual(result);
  });
});
