import {
  IsString,
  IsArray,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsDateString,
  IsMongoId,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['open', 'in-progress', 'completed'])
  status: string; // Current project status

  @IsArray()
  @IsOptional()
  tags?: string[]; // Tags for categorization

  @IsArray()
  @IsOptional()
  skillsNeeded?: string[]; // Required skills

  @IsDateString()
  deadline: Date; // Deadline for the project

  @IsString()
  duration: string; // Estimated duration of the project

  @IsEnum(['short-term', 'long-term'])
  projectType: string; // Type of project (short-term or long-term)

  @IsBoolean()
  remote: boolean; // Whether the project is remote

  @IsString()
  @IsOptional()
  location?: string; // Optional location if the project is on-site

  @IsMongoId()
  createdBy: string; // Reference to the user who created the project

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  interestedUsers?: string[]; // References to users who showed interest

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  team?: string[]; // References to users who are part of the team

  @IsMongoId()
  @IsOptional()
  threadId?: string; // Reference to a thread related to the project
}
