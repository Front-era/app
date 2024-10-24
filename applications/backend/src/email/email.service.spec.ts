import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EmailService } from './email.service';
import { Email } from './email.schema';
import { Model } from 'mongoose';

describe('EmailService', () => {
  let service: EmailService;
  let model: Model<Email>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: getModelToken(Email.name),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    model = module.get<Model<Email>>(getModelToken(Email.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
