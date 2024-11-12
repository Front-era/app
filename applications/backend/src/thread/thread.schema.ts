import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Thread extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  participants: Types.ObjectId[];

  @Prop({ type: String })
  title: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
