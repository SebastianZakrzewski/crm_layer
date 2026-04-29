import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import type { CrmDeal } from '@app/common/types/crm-deal';
import { GetBitrixDealParamsDto } from './models/get-bitrix-deal-params.dto';
import { Bitrix24Service } from './bitrix24.service';

/**
 * HTTP adapter for external callers targeting Bitrix24-backed CRM operations.
 */
@Controller('bitrix24')
export class Bitrix24Controller {
  public constructor(private readonly bitrix24Service: Bitrix24Service) {}

  /**
   * Lightweight health-style probe for routing and module wiring.
   */
  @Get('admin/test')
  public adminTest(): Readonly<{
    readonly ok: true;
    readonly provider: 'bitrix24';
  }> {
    return { ok: true, provider: 'bitrix24' };
  }

  /**
   * Returns a normalized deal by Bitrix24 deal identifier.
   */
  @Get('deals/:dealId')
  public async getDeal(
    @Param() params: GetBitrixDealParamsDto,
  ): Promise<CrmDeal> {
    const deal = await this.bitrix24Service.getDeal(params.dealId);
    if (deal === null) {
      throw new NotFoundException(`Deal "${params.dealId}" was not found.`);
    }
    return deal;
  }
}
