import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  getSmokeResult(): { readonly status: string } {
    return { status: 'ok' } as const;
  }
}
