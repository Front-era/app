import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Assignment extends Document {
  // Field: `title` stores the name of the assignment.
  @Prop({ type: String, required: true })
  title: string; // Assignment title.

  // Field: `description` provides additional details about the assignment.
  @Prop({ type: String })
  description: string; // Optional assignment description.

  // Field: `projectId` references the project this assignment belongs to.
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId; // Links the assignment to a specific project.

  // Field: `dueDate` specifies the deadline for the assignment.
  @Prop({ type: Date })
  dueDate: Date; // Optional due date.

  // Field: `createdAt` stores the timestamp when the assignment was created.
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  // Field: `updatedAt` stores the timestamp of the last modification.
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  // Field: `isActive` indicates if the assignment is currently active.
  @Prop({ type: Boolean, default: true })
  isActive: boolean; // Determines if the assignment is visible or archived.
}

// Generates the Mongoose schema for the `Assignment` class.
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
