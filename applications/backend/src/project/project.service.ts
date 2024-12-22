import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { Model } from 'mongoose';
import { Project } from './/project.schema';
import { CreateProjectDto } from './project.dto';
// import { ElasticSearchService } from '../elastic.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    // private elasticSearchService: ElasticSearchService,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const project = await this.projectModel.create(createProjectDto);
      const savedProject = await project.save();

      // Synchronize with Elasticsearch
      // await this.elasticSearchService.indexDocument(
      //   savedProject._id.toString(),
      //   {
      //     title: savedProject.title,
      //     description: savedProject.description,
      //     tags: savedProject.tags,
      //     skillsNeeded: savedProject.skillsNeeded,
      //   },
      // );

      return savedProject;
    } catch (error) {
      console.error('Error creating project:', error.message);
      throw error;
    }
  }

  // Finds all projects
  async findAll(): Promise<Project[]> {
    return this.projectModel.find({}).exec();
  }

  // Finds a project by ID
  async findById(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  // Finds projects by tags
  async findByTags(tags: string[]): Promise<Project[]> {
    return this.projectModel.find({ tags: { $in: tags } }).exec();
  }

  // Finds projects by skills
  async findBySkills(skills: string[]): Promise<Project[]> {
    return this.projectModel.find({ skillsNeeded: { $in: skills } }).exec();
  }

  //  Finds projects by user
  async findByUser(userId: string): Promise<Project[]> {
    return this.projectModel.find({ createdBy: userId }).exec();
  }

  // Updates a project
  async updateProject(
    id: string,
    updateData: Partial<CreateProjectDto>,
  ): Promise<Project> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedProject) {
      throw new Error('Project not found');
    }

    // Update Elasticsearch
    // await this.elasticSearchService.indexDocument(id, {
    //   title: updatedProject.title,
    //   description: updatedProject.description,
    //   tags: updatedProject.tags,
    //   skillsNeeded: updatedProject.skillsNeeded,
    // });

    return updatedProject;
  }

  // Deletes a project
  async deleteProject(id: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();

    if (!deletedProject) {
      throw new Error('Project not found');
    }

    // Remove from Elasticsearch
    // await this.elasticSearchService.deleteDocument(id);

    return deletedProject;
  }

  // Marks a project as completed
  async markAsCompleted(id: string): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(id, { status: 'completed' }, { new: true })
      .exec();
  }

  // Adds an interested user
  async addInterestedUser(projectId: string, userId: string): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $addToSet: { interestedUsers: userId } },
        { new: true },
      )
      .exec();
  }

  // Removes an interested user
  async removeInterestedUser(
    projectId: string,
    userId: string,
  ): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $pull: { interestedUsers: userId } },
        { new: true },
      )
      .exec();
  }

  // Adds a team member
  async addTeamMember(projectId: string, userId: string): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $addToSet: { team: userId } },
        { new: true },
      )
      .exec();
  }

  // Search with Elasticsearch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async searchProjects(query: string): Promise<any> {
    // return this.elasticSearchService.search(query);
  }

  async bulkIndexProjects(): Promise<void> {
    const projects = await this.projectModel.find().exec();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const documents = projects.map((project) => ({
      id: project._id.toString(),
      body: {
        title: project.title,
        description: project.description,
        tags: project.tags,
        skillsNeeded: project.skillsNeeded,
      },
    }));

    // await this.elasticSearchService.bulkIndex(documents);
  }
}
