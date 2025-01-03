import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ColonyService } from './colony.service';
import { Colony } from './colony.schema';
import { User } from 'src/user/user.schema';

@Controller('colonies')
export class ColonyController {
  constructor(private readonly colonyService: ColonyService) {}

  @Post()
  async createColony(@Body() colonyData: Partial<Colony>): Promise<Colony> {
    return this.colonyService.createColony(colonyData);
  }

  @Get()
  async findAll(): Promise<Colony[]> {
    return this.colonyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Colony> {
    return this.colonyService.findById(id);
  }

  @Get(':id/users')
  async findAllUsers(@Param('id') id: string): Promise<User[]> {
    return this.colonyService.findAllUsers(id);
  }

  @Patch(':id')
  async updateColony(
    @Param('id') id: string,
    @Body() updateData: Partial<Colony>,
  ): Promise<Colony> {
    return this.colonyService.updateColony(id, updateData);
  }

  @Delete(':id')
  async deleteColony(@Param('id') id: string): Promise<Colony> {
    return this.colonyService.deleteColony(id);
  }
}
