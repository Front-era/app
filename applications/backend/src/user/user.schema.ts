import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: {
      bio: String,
      skills: [String],
      interests: [String],
      portfolio_links: [String],
    },
  })
  profileInfo: {
    bio?: string;
    skills?: string[];
    interests?: string[];
    portfolio_links?: string[];
  };

  @Prop()
  faction?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Project' })
  projects: Types.ObjectId[];

  @Prop({ default: false })
  lookingForCofounder: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
