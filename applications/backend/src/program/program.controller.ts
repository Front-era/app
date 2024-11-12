import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { Program } from './program.schema';

@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async createProgram(@Body() programData: Partial<Program>): Promise<Program> {
    return this.programService.createProgram(programData);
  }

  @Get()
  async findAll(): Promise<Program[]> {
    return this.programService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Program> {
    return this.programService.findById(id);
  }

  @Patch(':id')
  async updateProgram(
    @Param('id') id: string,
    @Body() updateData: Partial<Program>,
  ): Promise<Program> {
    return this.programService.updateProgram(id, updateData);
  }

  @Delete(':id')
  async deleteProgram(@Param('id') id: string): Promise<Program> {
    return this.programService.deleteProgram(id);
  }
}
