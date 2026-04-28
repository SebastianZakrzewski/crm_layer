import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common/common.module';

/** Root application module. Add domain modules under `modules/`. */
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule],
})
export class AppModule {}
