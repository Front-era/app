import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './assignment.schema';
  
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  
  @Post()
  async createAssignment(@Body() assignemntData: Partial<Assignment>): Promise<Assignment> {
    return this.assignmentService.createAssignment(assignemntData);
  }

  @Get()
  async findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Assignment> {
    return this.assignmentService.findById(id);
  }

  @Patch(':id')
  async updateAssignment(
    @Param('id') id: string,
    @Body() updateData: Partial<Assignment>
  ): Promise<Assignment> {
    return this.assignmentService.updateAssignment(id, updateData);
  }

  @Delete(':id')
  async deleteAssignment(@Param('id') id: string): Promise<Assignment> {
    return this.assignmentService.deleteAssignment(id);
  }
}
  