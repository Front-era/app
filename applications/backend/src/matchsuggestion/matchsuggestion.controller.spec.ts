import { Test, TestingModule } from '@nestjs/testing';
import { MatchsuggestionController } from './matchsuggestion.controller';

describe('MatchsuggestionController', () => {
  let controller: MatchsuggestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchsuggestionController],
    }).compile();

    controller = module.get<MatchsuggestionController>(MatchsuggestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
