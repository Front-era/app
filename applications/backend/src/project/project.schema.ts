import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['open', 'in-progress', 'completed'] })
  status: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  skillsNeeded: string[];

  @Prop({ type: Date, required: true })
  deadline: Date;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, enum: ['short-term', 'long-term'] })
  projectType: string;

  @Prop({ required: true, type: Boolean })
  remote: boolean;

  @Prop({ type: String, required: false })
  location?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  interestedUsers: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  team: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Thread', required: false })
  threadId?: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
