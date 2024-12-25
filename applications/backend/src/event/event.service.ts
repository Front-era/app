import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    const newEvent = await this.eventModel.create(eventData);
    return newEvent;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find({}).exec();
  }

  async findById(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }

  async updateEvent(id: string, updateData: Partial<Event>): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteEvent(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
