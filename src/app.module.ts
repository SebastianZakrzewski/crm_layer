import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common/common.module';
import { ExampleModule } from './modules/example/example.module';

/** Root application module. Add domain modules under `modules/`. */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ExampleModule,
  ],
})
export class AppModule {}
