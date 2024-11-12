import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MatchSuggestion,
  MatchSuggestionSchema,
} from './matchsuggestion.schema';
import { MatchSuggestionService } from './matchsuggestion.service';
import { MatchSuggestionController } from './matchsuggestion.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchSuggestion.name, schema: MatchSuggestionSchema },
    ]),
  ],
  controllers: [MatchSuggestionController],
  providers: [MatchSuggestionService],
})
export class MatchSuggestionModule {}
