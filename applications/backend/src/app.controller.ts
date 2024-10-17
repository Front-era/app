import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection, // Inject MongoDB connection
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // New route to test MongoDB connection
  @Get('test-connection')
  testConnection(): string {
    const dbStatus = this.connection.readyState; // Get MongoDB connection status
    return dbStatus === 1
      ? 'Connected to MongoDB'
      : 'MongoDB connection failed';
  }
}
