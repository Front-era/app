import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MatchSuggestionService } from './matchsuggestion.service';
import { MatchSuggestion } from './matchsuggestion.schema';

@Controller('matchsuggestions')
export class MatchSuggestionController {
  constructor(
    private readonly matchSuggestionService: MatchSuggestionService,
  ) {}

  @Post()
  async createMatchSuggestion(
    @Body() suggestionData: Partial<MatchSuggestion>,
  ): Promise<MatchSuggestion> {
    return this.matchSuggestionService.createMatchSuggestion(suggestionData);
  }

  @Get()
  async findAll(): Promise<MatchSuggestion[]> {
    return this.matchSuggestionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<MatchSuggestion> {
    return this.matchSuggestionService.findById(id);
  }

  @Get('/user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<MatchSuggestion[]> {
    return this.matchSuggestionService.findByUser(userId);
  }

  @Patch(':id')
  async updateMatchSuggestion(
    @Param('id') id: string,
    @Body() updateData: Partial<MatchSuggestion>,
  ): Promise<MatchSuggestion> {
    return this.matchSuggestionService.updateMatchSuggestion(id, updateData);
  }

  @Delete(':id')
  async deleteMatchSuggestion(
    @Param('id') id: string,
  ): Promise<MatchSuggestion> {
    return this.matchSuggestionService.deleteMatchSuggestion(id);
  }
}
