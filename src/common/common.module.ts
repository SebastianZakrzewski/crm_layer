import { Global, Module } from '@nestjs/common';

/**
 * Shared infrastructure: re-export providers used across feature modules.
 * Place shared code under `@app/common/*` subfolders (e.g. `clients/` for external CRM adapters, `types/`, `services/`).
 */
@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
