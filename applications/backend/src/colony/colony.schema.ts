import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Colony extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  users: Types.ObjectId[];

  @Prop({
    type: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const ColonySchema = SchemaFactory.createForClass(Colony);
