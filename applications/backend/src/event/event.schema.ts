import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({type: String, required: true})
  location: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date, required: true })
  date: Date
}

export const EventSchema = SchemaFactory.createForClass(Event);