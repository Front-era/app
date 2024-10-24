import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Email extends Document {
  @Prop({ required: true, unique: true })
  email: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
