import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let emailController: EmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: {
            addEmail: jest.fn(), // Mock the addEmail function
            getEmails: jest.fn(), // Mock the getEmails function
          },
        },
      ],
    }).compile();

    emailController = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(emailController).toBeDefined();
  });
});
