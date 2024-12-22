import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';

// ProfileInfo class for nested validation
class ProfileInfo {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  portfolio_links?: string[];
}

// UserDto class
export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  faction?: string;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => ProfileInfo)
  // profileInfo?: ProfileInfo;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  projects?: string[]; // Array of Project IDs
}
