import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

/** Replace with a real domain module (one primary module per route group). */
@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
