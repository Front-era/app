import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UseInterceptors } from '@nestjs/common';
import { ParamsInterceptor } from 'src/server/params.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  @UseInterceptors(ParamsInterceptor)
  public home() {
    return {};
  }

  @Get(':id')
  @Render('[id]')
  @UseInterceptors(ParamsInterceptor)
  public blogPost() {
    return {};
  }

  @Get('/api/blog-posts')
  public listBlogPosts() {
    return this.appService.getBlogPosts();
  }

  @Get('/api/blog-posts/:id')
  public getBlogPostById(@Param('id', ParseIntPipe) id: number) {
    // Simplified ParseIntPipe usage
    return this.appService.getBlogPost(id);
  }
}
