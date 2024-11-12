import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class MatchSuggestion extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projectSuggestions: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  teammateSuggestions: Types.ObjectId[];
}

export const MatchSuggestionSchema =
  SchemaFactory.createForClass(MatchSuggestion);
