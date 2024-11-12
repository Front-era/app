import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program } from './program.schema';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<Program>,
  ) {}

  async createProgram(programData: Partial<Program>): Promise<Program> {
    const newProgram = new this.programModel(programData);
    return newProgram.save();
  }

  async findAll(): Promise<Program[]> {
    return this.programModel.find().exec();
  }

  async findById(id: string): Promise<Program> {
    return this.programModel.findById(id).exec();
  }

  async updateProgram(
    id: string,
    updateData: Partial<Program>,
  ): Promise<Program> {
    return this.programModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteProgram(id: string): Promise<Program> {
    return this.programModel.findByIdAndDelete(id).exec();
  }
}
