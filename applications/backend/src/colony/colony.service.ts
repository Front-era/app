import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Colony } from './colony.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class ColonyService {
  constructor(@InjectModel(Colony.name) private colonyModel: Model<Colony>) {}

  async createColony(colonyData: Partial<Colony>): Promise<Colony> {
    const newColony = await this.colonyModel.create(colonyData);
    return newColony;
  }

  async findAll(): Promise<Colony[]> {
    return this.colonyModel.find({}).exec();
  }

  async findById(id: string): Promise<Colony> {
    return this.colonyModel.findById(id).exec();
  }

  async findAllUsers(id: string): Promise<User[]> {
    const colony = await this.colonyModel.findById(id).populate('users').exec();
    if (!colony) {
      throw new NotFoundException(`Colony with ID ${id} not found.`);
    }
    return colony.users as unknown as User[];
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
