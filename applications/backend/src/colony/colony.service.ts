import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colony } from './colony.schema';

@Injectable()
export class ColonyService {
  constructor(@InjectModel(Colony.name) private colonyModel: Model<Colony>) {}

  async createColony(colonyData: Partial<Colony>): Promise<Colony> {
    const newColony = new this.colonyModel(colonyData);
    return newColony.save();
  }

  async findAll(): Promise<Colony[]> {
    return this.colonyModel.find().exec();
  }

  async findById(id: string): Promise<Colony> {
    return this.colonyModel.findById(id).exec();
  }

  async updateColony(id: string, updateData: Partial<Colony>): Promise<Colony> {
    return this.colonyModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteColony(id: string): Promise<Colony> {
    return this.colonyModel.findByIdAndDelete(id).exec();
  }
}
