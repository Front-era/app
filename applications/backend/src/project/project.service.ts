import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const newProject = new this.projectModel(projectData);
    return newProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project> {
    return this.projectModel.findById(id).exec();
  }

  async updateProject(
    id: string,
    updateData: Partial<Project>,
  ): Promise<Project> {
    return this.projectModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async deleteProject(id: string): Promise<Project> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
