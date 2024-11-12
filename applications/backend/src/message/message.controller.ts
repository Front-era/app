import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() messageData: Partial<Message>): Promise<Message> {
    return this.messageService.createMessage(messageData);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Message> {
    return this.messageService.findById(id);
  }

  @Get('/thread/:threadId')
  async findByThread(@Param('threadId') threadId: string): Promise<Message[]> {
    return this.messageService.findByThread(threadId);
  }

  @Patch(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateData: Partial<Message>,
  ): Promise<Message> {
    return this.messageService.updateMessage(id, updateData);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<Message> {
    return this.messageService.deleteMessage(id);
  }
}
