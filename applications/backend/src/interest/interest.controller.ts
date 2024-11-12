import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { Interest } from './interest.schema';

@Controller('interests')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  async createInterest(
    @Body() interestData: Partial<Interest>,
  ): Promise<Interest> {
    return this.interestService.createInterest(interestData);
  }

  @Get()
  async findAll(): Promise<Interest[]> {
    return this.interestService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Interest> {
    return this.interestService.findById(id);
  }

  @Patch(':id')
  async updateInterest(
    @Param('id') id: string,
    @Body() updateData: Partial<Interest>,
  ): Promise<Interest> {
    return this.interestService.updateInterest(id, updateData);
  }

  @Delete(':id')
  async deleteInterest(@Param('id') id: string): Promise<Interest> {
    return this.interestService.deleteInterest(id);
  }
}
