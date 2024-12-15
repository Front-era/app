// src/email/email.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async addEmail(@Body('email') email: string, @Body('yearOfBirth') yearOfBirth: number, @Body('state') state: string) {
    return this.emailService.addEmail(email,yearOfBirth, state);
  }

  @Get()
  async getEmails() {
    return this.emailService.getEmails();
  }
}
