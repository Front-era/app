import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { InterestModule } from './interest/interest.module';
import { ThreadModule } from './thread/thread.module';
import { MessageModule } from './message/message.module';
import { SubmissionModule } from './submission/submission.module';
import { MatchSuggestionModule } from './matchsuggestion/matchsuggestion.module';
import { ProgramModule } from './program/program.module';
import { ColonyModule } from './colony/colony.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EmailModule,
    UserModule,
    ProjectModule,
    InterestModule,
    ThreadModule,
    MessageModule,
    SubmissionModule,
    MatchSuggestionModule,
    ProgramModule,
    ColonyModule, // Connect to MongoDB
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
