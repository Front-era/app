import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Thread } from './thread.schema';

@Injectable()
export class ThreadService {
  constructor(@InjectModel(Thread.name) private threadModel: Model<Thread>) {}

  async createThread(threadData: Partial<Thread>): Promise<Thread> {
    const newThread = await this.threadModel.create(threadData);
    return newThread;
  }

  async findAll(): Promise<Thread[]> {
    return this.threadModel.find({}).exec();
  }

  async findById(id: string): Promise<Thread> {
    return this.threadModel.findById(id).exec();
  }

  async updateThread(id: string, updateData: Partial<Thread>): Promise<Thread> {
    return this.threadModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteThread(id: string): Promise<Thread> {
    return this.threadModel.findByIdAndDelete(id).exec();
  }
}
