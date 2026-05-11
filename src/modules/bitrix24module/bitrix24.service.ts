import { Injectable } from '@nestjs/common';
import type { CrmDeal } from '@app/common/types/crm-deal';
import type { DealFields } from '@app/common/types/crm-deal-fields';
import { attachBitrixDealFieldLabels } from './attach-bitrix-deal-field-labels';
import { Bitrix24Client } from './bitrix24.client';

/**
 * Bitrix24-facing application service: delegates to {@link Bitrix24Client} while keeping HTTP adapters thin.
 */
@Injectable()
export class Bitrix24Service {
  public constructor(private readonly bitrix24Client: Bitrix24Client) {}

  /**
   * Loads a normalized deal from Bitrix24 and attaches `fieldLabels` from `crm.deal.fields`.
   */
  public async getDeal(dealId: string): Promise<CrmDeal | null> {
    const deal = await this.bitrix24Client.getDeal(dealId);
    if (deal === null) {
      return null;
    }
    const displayNames =
      await this.bitrix24Client.getCrmDealFieldDisplayNameMap();
    return attachBitrixDealFieldLabels(deal, displayNames);
  }

  /**
   * Loads normalized deal fields (values + catalog labels) from Bitrix24.
   */
  public async getDealFields(dealId: string): Promise<DealFields | null> {
    return this.bitrix24Client.getFields(dealId);
  }
}
