import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from './submission.schema';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async createSubmission(
    submissionData: Partial<Submission>,
  ): Promise<Submission> {
    const newSubmission = new this.submissionModel(submissionData);
    return newSubmission.save();
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionModel.find().exec();
  }

  async findById(id: string): Promise<Submission> {
    return this.submissionModel.findById(id).exec();
  }

  async findByProject(projectId: string): Promise<Submission[]> {
    return this.submissionModel.find({ projectId }).exec();
  }

  async findByUser(userId: string): Promise<Submission[]> {
    return this.submissionModel.find({ userId }).exec();
  }

  async updateSubmission(
    id: string,
    updateData: Partial<Submission>,
  ): Promise<Submission> {
    return this.submissionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteSubmission(id: string): Promise<Submission> {
    return this.submissionModel.findByIdAndDelete(id).exec();
  }
}
