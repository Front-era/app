// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email } from './email.schema';

@Injectable()
export class EmailService {
  constructor(@InjectModel(Email.name) private emailModel: Model<Email>) {}

  async addEmail(email: string, yearOfBirth:number, state:string): Promise<Email> {
    const newEmail = new this.emailModel({ email, yearOfBirth, state });
    return newEmail.save();
  }

  async getEmails(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }
}
