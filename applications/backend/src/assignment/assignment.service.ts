import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from './assignment.schema';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async createAssignment(assignemntData: Partial<Assignment>): Promise<Assignment> {
    const newAssignment = new this.assignmentModel(assignemntData);
    return newAssignment.save();
  }

  async findAll(): Promise<Assignment[]> {
    return this.assignmentModel.find().exec();
  }

  async findById(id: string): Promise<Assignment> {
    return this.assignmentModel.findById(id).exec();
  }

  async updateAssignment(
    id: string,
    assignmentData: Partial<Assignment>
  ): Promise<Assignment> {
    return this.assignmentModel
      .findByIdAndUpdate(id, assignmentData, { new: true } )
      .exec();
  }
  
  async deleteAssignment(id: string): Promise<Assignment> {
    return this.assignmentModel.findByIdAndDelete(id).exec();
  }
}
