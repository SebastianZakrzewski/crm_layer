import { Global, Module } from '@nestjs/common';

/**
 * Shared infrastructure: re-export providers used across feature modules.
 * Place shared code under `@app/common/*` subfolders per project conventions.
 */
@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
