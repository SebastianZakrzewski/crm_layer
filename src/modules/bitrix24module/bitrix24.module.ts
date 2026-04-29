import { Module } from '@nestjs/common';
import { AbstractCrmClient } from '@app/common/clients/abstract-crm-client';
import { Bitrix24Controller } from './bitrix24.controller';
import { Bitrix24Client } from './bitrix24.client';
import { Bitrix24Service } from './bitrix24.service';

/**
 * Feature module for Bitrix24 CRM integration: registers {@link Bitrix24Client} and exposes {@link AbstractCrmClient}.
 */
@Module({
  controllers: [Bitrix24Controller],
  providers: [
    Bitrix24Client,
    Bitrix24Service,
    {
      provide: AbstractCrmClient,
      useExisting: Bitrix24Client,
    },
  ],
  exports: [Bitrix24Client, AbstractCrmClient],
})
export class Bitrix24Module {}
