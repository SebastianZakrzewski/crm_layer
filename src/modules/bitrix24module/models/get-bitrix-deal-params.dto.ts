import { IsString, Matches } from 'class-validator';

/**
 * Route parameters for loading a Bitrix24-backed deal by numeric identifier.
 */
export class GetBitrixDealParamsDto {
  @IsString()
  @Matches(/^\d+$/, { message: 'dealId must be a non-empty numeric string' })
  public readonly dealId!: string;
}
