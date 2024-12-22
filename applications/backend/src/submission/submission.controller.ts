import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { Submission } from './submission.schema';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  async createSubmission(
    @Body() submissionData: Partial<Submission>,
  ): Promise<Submission> {
    return this.submissionService.createSubmission(submissionData);
  }

  @Get()
  async findAll(): Promise<Submission[]> {
    return this.submissionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Submission> {
    return this.submissionService.findById(id);
  }

  @Get('/project/:projectId')
  async findByProject(
    @Param('projectId') projectId: string,
  ): Promise<Submission[]> {
    return this.submissionService.findByProject(projectId);
  }
  
  @Get('/user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<Submission[]> {
    return this.submissionService.findByUser(userId);
  }

  @Patch(':id')
  async updateSubmission(
    @Param('id') id: string,
    @Body() updateData: Partial<Submission>,
  ): Promise<Submission> {
    return this.submissionService.updateSubmission(id, updateData);
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: string): Promise<Submission> {
    return this.submissionService.deleteSubmission(id);
  }
}
