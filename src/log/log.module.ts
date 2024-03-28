import { Module } from '@nestjs/common';
import { MyLogger } from './log.service';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class MyLoggerModule {}
