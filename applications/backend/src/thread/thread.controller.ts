import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ThreadService } from './thread.service';
import { Thread } from './thread.schema';

@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  async createThread(@Body() threadData: Partial<Thread>): Promise<Thread> {
    return this.threadService.createThread(threadData);
  }

  @Get()
  async findAll(): Promise<Thread[]> {
    return this.threadService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Thread> {
    return this.threadService.findById(id);
  }

  @Patch(':id')
  async updateThread(
    @Param('id') id: string,
    @Body() updateData: Partial<Thread>,
  ): Promise<Thread> {
    return this.threadService.updateThread(id, updateData);
  }

  @Delete(':id')
  async deleteThread(@Param('id') id: string): Promise<Thread> {
    return this.threadService.deleteThread(id);
  }
}
