import { Test, TestingModule } from '@nestjs/testing';
import { ColonyService } from './colony.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colony } from './colony.schema';

describe('ColonyService', () => {
  let service: ColonyService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<Colony>;

  const mockColony = {
    title: 'Test Colony',
    url: 'https://testcolony.com',
    category: 'test-category',
    tags: ['test', 'colony'],
    projects: [],
    save: jest.fn().mockResolvedValue(this),
  };

  const mockModel = {
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      save: jest.fn().mockResolvedValue(dto),
    })),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockColony]),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockColony),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockColony),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockColony),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColonyService,
        {
          provide: getModelToken(Colony.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<ColonyService>(ColonyService);
    model = module.get<Model<Colony>>(getModelToken(Colony.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a colony', async () => {
    const colonyData = {
      title: 'Test Colony',
      url: 'https://testcolony.com',
      category: 'test-category',
    };

    const result = await service.createColony(colonyData);

    expect(mockModel.create).toHaveBeenCalledWith(colonyData);
    expect(result).toMatchObject(colonyData);
  });

  it('should return all colonies', async () => {
    const result = await service.findAll();

    expect(mockModel.find).toHaveBeenCalled();
    expect(result).toEqual([mockColony]);
  });

  it('should find a colony by id', async () => {
    const result = await service.findById('12345');

    expect(mockModel.findById).toHaveBeenCalledWith('12345');
    expect(result).toEqual(mockColony);
  });

  it('should update a colony by id', async () => {
    const updateData = { title: 'Updated Colony' };
    const result = await service.updateColony('12345', updateData);

    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '12345',
      updateData,
      { new: true },
    );
    expect(result).toEqual(mockColony);
  });

  it('should delete a colony by id', async () => {
    const result = await service.deleteColony('12345');

    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('12345');
    expect(result).toEqual(mockColony);
  });
});
