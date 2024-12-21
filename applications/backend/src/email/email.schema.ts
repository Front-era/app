import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Email extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 1000, max: 5000 })
  yearOfBirth: number;

  @Prop({ required: true })
  state: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
