import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Program extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ type: [String] })
  goals: string[];

  @Prop({ type: [String] })
  photos: string[];

  @Prop({ type: [String] })
  videos: string[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
