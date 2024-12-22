import { IsArray, IsOptional, IsString } from 'class-validator';

export class MatchSuggestionDto {
  @IsString()
  userId: string; // References the User collection

  @IsOptional()
  @IsArray()
  projectSuggestions?: string[]; // Array of Project IDs

  @IsOptional()
  @IsArray()
  teammateSuggestions?: string[]; // Array of User IDs for teammate suggestions
}
