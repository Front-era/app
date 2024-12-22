import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email } from './email.schema';

@Injectable()
export class EmailService {
  constructor(@InjectModel(Email.name) private emailModel: Model<Email>) {}

  async addEmail(email: string): Promise<any> {
    console.log('Starting to add email:', email);
    try {
      const newEmail = new this.emailModel({ email });
      const savedEmail = await newEmail.save();
      console.log('Email added successfully:', savedEmail);
      return savedEmail;
    } catch (error) {
      console.error('Error while adding email:', error);
      if (error.code === 11000) {
        throw new ConflictException('Email already exists.');
      }
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  // get count of emails
  async getCount(): Promise<number> {
    return this.emailModel.countDocuments().exec();
  }

  async getEmails(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }
}
