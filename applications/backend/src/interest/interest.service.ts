import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interest } from './interest.schema';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest.name) private interestModel: Model<Interest>,
  ) {}

  async createInterest(interestData: Partial<Interest>): Promise<Interest> {
    const newInterest = new this.interestModel(interestData);
    return newInterest.save();
  }

  async findAll(): Promise<Interest[]> {
    return this.interestModel.find().exec();
  }

  async findById(id: string): Promise<Interest> {
    return this.interestModel.findById(id).exec();
  }

  async updateInterest(
    id: string,
    updateData: Partial<Interest>,
  ): Promise<Interest> {
    return this.interestModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteInterest(id: string): Promise<Interest> {
    return this.interestModel.findByIdAndDelete(id).exec();
  }
}
