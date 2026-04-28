import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@app/common/common.module';
import { Bitrix24Module } from '@app/modules/bitrix24module/bitrix24.module';

/** Root application module. Add domain modules under `modules/`. */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    Bitrix24Module,
  ],
})
export class AppModule {}
