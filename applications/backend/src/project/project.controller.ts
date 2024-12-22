import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Delete,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.schema';
import { CreateProjectDto } from './project.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Types } from 'mongoose';

@Controller('projects')
export class ProjectController {
  elasticSearchService: any;
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() projectData: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(projectData);
  }

  @Get()
  async findAllProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get('search')
  async searchProjects(@Query('query') query: string): Promise<any> {
    if (!query) {
      throw new Error('Query parameter is required');
    }
    return this.projectService.searchProjects(query);
  }

  @Get(':id')
  async findProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectService.findById(id);
  }

  @Get('filter/tags')
  async findProjectsByTags(@Query('tags') tags: string): Promise<Project[]> {
    const tagsArray = tags.split(',');
    return this.projectService.findByTags(tagsArray);
  }

  @Get('filter/skills')
  async findProjectsBySkills(
    @Query('skills') skills: string,
  ): Promise<Project[]> {
    const skillsArray = skills.split(',');
    return this.projectService.findBySkills(skillsArray);
  }

  @Get('user/:userId')
  async findProjectsByUser(
    @Param('userId') userId: string,
  ): Promise<Project[]> {
    return this.projectService.findByUser(userId);
  }

  @Put(':id/complete')
  async markProjectAsCompleted(@Param('id') id: string): Promise<Project> {
    return this.projectService.markAsCompleted(id);
  }

  @Put(':id/interested/:userId')
  async addInterestedUser(
    @Param('id') projectId: string,
    @Param('userId') userId: string,
  ): Promise<Project> {
    return this.projectService.addInterestedUser(projectId, userId);
  }

  @Put(':id/remove-interested/:userId')
  async removeInterestedUser(
    @Param('id') projectId: string,
    @Param('userId') userId: string,
  ): Promise<Project> {
    return this.projectService.removeInterestedUser(projectId, userId);
  }

  @Put(':id/team/:userId')
  async addTeamMember(
    @Param('id') projectId: string,
    @Param('userId') userId: string,
  ): Promise<Project> {
    return this.projectService.addTeamMember(projectId, userId);
  }
}
