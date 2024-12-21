import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Submission extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  submittedBy: Types.ObjectId;

  @Prop({
    type: {
      description: { type: String },
      photo: { type: String },
      videoLinks: { type: [String] },
    },
  })
  content: {
    description: string;
    photo: string;
    videoLinks: string[];
  };

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true })
  assignmentId: Types.ObjectId;

  @Prop({ type: Boolean, required: true })
  consent: boolean;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
