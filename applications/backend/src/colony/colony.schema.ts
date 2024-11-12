import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Colony extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [Types.ObjectId], ref: 'Project' })
  projects: Types.ObjectId[];
}

export const ColonySchema = SchemaFactory.createForClass(Colony);
