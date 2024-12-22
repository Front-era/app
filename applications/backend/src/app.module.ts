import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule available globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Use ConfigService to get the MongoDB URI
      }),
      inject: [ConfigService],
    }),
    EmailModule,
    UserModule,
    ProjectModule,
    InterestModule,
    ThreadModule,
    MessageModule,
    SubmissionModule,
    MatchSuggestionModule,
    ProgramModule,
    ColonyModule,
    AssignmentModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
