import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  state: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  colonyId: string;

  @Prop({ required: false })
  lastSigninAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

