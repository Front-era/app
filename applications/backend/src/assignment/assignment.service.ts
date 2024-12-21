import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from './assignment.schema';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}
}
