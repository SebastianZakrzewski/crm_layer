import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  /** Smoke test endpoint — add the same route pattern to each primary controller. */
  @Get('admin/test')
  adminTest(): ReturnType<ExampleService['getSmokeResult']> {
    return this.exampleService.getSmokeResult();
  }
}
