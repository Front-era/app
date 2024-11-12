import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Colony, ColonySchema } from './colony.schema';
import { ColonyService } from './colony.service';
import { ColonyController } from './colony.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Colony.name, schema: ColonySchema }]),
  ],
  controllers: [ColonyController],
  providers: [ColonyService],
})
export class ColonyModule {}
