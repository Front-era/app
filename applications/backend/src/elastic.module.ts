import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic.service';

@Module({
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class ElasticModule {}
