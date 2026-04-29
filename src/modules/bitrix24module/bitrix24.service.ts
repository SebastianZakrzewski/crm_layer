import { Injectable } from '@nestjs/common';
import type { CrmDeal } from '@app/common/types/crm-deal';
import { Bitrix24Client } from './bitrix24.client';

/**
 * Bitrix24-facing application service: delegates to {@link Bitrix24Client} while keeping HTTP adapters thin.
 */
@Injectable()
export class Bitrix24Service {
  public constructor(private readonly bitrix24Client: Bitrix24Client) {}

  /**
   * Loads a normalized deal row from Bitrix24 or returns null when the vendor reports a missing deal.
   */
  public async getDeal(dealId: string): Promise<CrmDeal | null> {
    return this.bitrix24Client.getDeal(dealId);
  }
}
