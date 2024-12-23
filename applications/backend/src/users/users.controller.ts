import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './create-user.dto';
  import { UpdateUserDto } from './update-user.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    async findAll() {
      try {
        return await this.usersService.findAll();
      } catch (error) {
        throw new HttpException(
          'Failed to fetch users',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        const user = await this.usersService.findOne(id);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to fetch user',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      try {
        return await this.usersService.create(createUserDto);
      } catch (error) {
        throw new HttpException(
          'Failed to create user ' + error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      try {
        const updatedUser = await this.usersService.update(id, updateUserDto);
        if (!updatedUser) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return updatedUser;
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to update user',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      try {
        const deletedUser = await this.usersService.delete(id);
        if (!deletedUser) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User successfully deleted', deletedUser };
      } catch (error) {
        throw new HttpException(
          error.message || 'Failed to delete user',
          error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  