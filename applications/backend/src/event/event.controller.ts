import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.schema';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() eventData: Partial<Event>): Promise<Event> {
    return this.eventService.createEvent(eventData);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Event> {
    return this.eventService.findById(id);
  }

  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateData: Partial<Event>,
  ): Promise<Event> {
    return this.eventService.updateEvent(id, updateData);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<Event> {
    return this.eventService.deleteEvent(id);
  }
}
