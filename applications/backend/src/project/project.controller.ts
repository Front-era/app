import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() projectData: Partial<Project>): Promise<Project> {
    return this.projectService.createProject(projectData);
  }

  @Get()
  async findAllProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateData: Partial<Project>,
  ): Promise<Project> {
    return this.projectService.updateProject(id, updateData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<Project> {
    return this.projectService.deleteProject(id);
  }
}
