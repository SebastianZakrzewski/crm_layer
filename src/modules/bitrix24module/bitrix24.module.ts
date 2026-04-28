import { Module } from '@nestjs/common';
import { AbstractCrmClient } from '@app/common/clients/abstract-crm-client';
import { Bitrix24Client } from './bitrix24.client';

/**
 * Feature module for Bitrix24 CRM integration: registers {@link Bitrix24Client} and exposes {@link AbstractCrmClient}.
 */
@Module({
  providers: [
    Bitrix24Client,
    {
      provide: AbstractCrmClient,
      useExisting: Bitrix24Client,
    },
  ],
  exports: [Bitrix24Client, AbstractCrmClient],
})
export class Bitrix24Module {}
