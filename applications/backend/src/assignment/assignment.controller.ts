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
  
}
  