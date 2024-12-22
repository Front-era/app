import { Controller, Get, Post, UseFilters, Body } from '@nestjs/common';
import { EmailService } from './email.service';

import { MongoExceptionFilter } from '../filters/mongo-exception.filter';
@UseFilters(MongoExceptionFilter)
@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async addEmail(@Body('email') email: string) {
    return this.emailService.addEmail(email);
  }

  @Get('count')
  async getCount() {
    return this.emailService.getCount();
  }

  @Get()
  async getEmails() {
    return this.emailService.getEmails();
  }
}
