import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { NODE_ENV } from './shared/constants/env';

// Start of Selection
@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: true }), {
      viewsDir: null,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
