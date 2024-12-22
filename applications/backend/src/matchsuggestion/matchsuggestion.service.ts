import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchSuggestion } from './matchsuggestion.schema';

@Injectable()
export class MatchSuggestionService {
  constructor(
    @InjectModel(MatchSuggestion.name)
    private matchSuggestionModel: Model<MatchSuggestion>,
  ) {}

  async createMatchSuggestion(
    suggestionData: Partial<MatchSuggestion>,
  ): Promise<MatchSuggestion> {
    const newSuggestion =
      await this.matchSuggestionModel.create(suggestionData);
    return newSuggestion.save();
  }

  async findAll(): Promise<MatchSuggestion[]> {
    return this.matchSuggestionModel.find({}).exec();
  }

  async findById(id: string): Promise<MatchSuggestion> {
    return this.matchSuggestionModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<MatchSuggestion[]> {
    return this.matchSuggestionModel.find({ userId }).exec();
  }

  async updateMatchSuggestion(
    id: string,
    updateData: Partial<MatchSuggestion>,
  ): Promise<MatchSuggestion> {
    return this.matchSuggestionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteMatchSuggestion(id: string): Promise<MatchSuggestion> {
    return this.matchSuggestionModel.findByIdAndDelete(id).exec();
  }
}
