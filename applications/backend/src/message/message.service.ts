import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(messageData: Partial<Message>): Promise<Message> {
    const newMessage = new this.messageModel(messageData);
    return newMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findById(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }

  async findByThread(threadId: string): Promise<Message[]> {
    return this.messageModel.find({ threadId }).exec();
  }

  async updateMessage(
    id: string,
    updateData: Partial<Message>,
  ): Promise<Message> {
    return this.messageModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteMessage(id: string): Promise<Message> {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
