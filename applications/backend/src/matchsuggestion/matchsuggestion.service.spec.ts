import { Test, TestingModule } from '@nestjs/testing';
import { MatchsuggestionService } from './matchsuggestion.service';

describe('MatchsuggestionService', () => {
  let service: MatchsuggestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchsuggestionService],
    }).compile();

    service = module.get<MatchsuggestionService>(MatchsuggestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
