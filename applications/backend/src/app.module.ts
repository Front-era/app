import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ProjectModule } from './project/project.module';
import { InterestModule } from './interest/interest.module';
import { ThreadModule } from './thread/thread.module';
import { MessageModule } from './message/message.module';
import { SubmissionModule } from './submission/submission.module';
import { MatchSuggestionModule } from './matchsuggestion/matchsuggestion.module';
import { ProgramModule } from './program/program.module';
import { ColonyModule } from './colony/colony.module';
import { Users } from './users/users.schema';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

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
    UsersModule,
    ProjectModule,
    InterestModule,
    ThreadModule,
    MessageModule,
    SubmissionModule,
    MatchSuggestionModule,
    ProgramModule,
    ColonyModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
