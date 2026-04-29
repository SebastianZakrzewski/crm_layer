import type { CrmDeal } from '@app/common/types/crm-deal';

const BITRIX_DEAL_CORE_FIELD_KEYS: ReadonlySet<string> = new Set([
  'ID',
  'TITLE',
  'OPPORTUNITY',
  'CURRENCY_ID',
  'STAGE_ID',
  'COMPANY_ID',
]);

function normalizeBitrixScalar(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return null;
}

function normalizeBitrixCustomValue(
  value: unknown,
):
  | string
  | number
  | boolean
  | null
  | readonly string[]
  | readonly number[]
  | undefined {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    if (value.every((item): item is string => typeof item === 'string')) {
      return value as readonly string[];
    }
    if (value.every((item): item is number => typeof item === 'number' && Number.isFinite(item))) {
      return value as readonly number[];
    }
  }
  return undefined;
}

/**
 * Maps a Bitrix24 `crm.deal.get` / `crm.deal.fields` style row to {@link CrmDeal}.
 */
export function mapBitrixDealRowToCrmDeal(raw: Readonly<Record<string, unknown>>): CrmDeal {
  const idRaw = raw.ID;
  const id =
    typeof idRaw === 'string' || typeof idRaw === 'number' ? String(idRaw).trim() : '';
  const titleRaw = raw.TITLE;
  const name = typeof titleRaw === 'string' ? titleRaw : '';
  const customEntries: Array<[string, NonNullable<CrmDeal['customFields']>[string]]> = [];
  for (const [key, value] of Object.entries(raw)) {
    if (BITRIX_DEAL_CORE_FIELD_KEYS.has(key)) {
      continue;
    }
    const normalized = normalizeBitrixCustomValue(value);
    if (normalized !== undefined) {
      customEntries.push([key, normalized]);
    }
  }
  const customFields: CrmDeal['customFields'] =
    customEntries.length > 0 ? Object.fromEntries(customEntries) : undefined;
  return {
    id,
    name,
    amount: normalizeBitrixScalar(raw.OPPORTUNITY),
    currency: normalizeBitrixScalar(raw.CURRENCY_ID),
    stageId: normalizeBitrixScalar(raw.STAGE_ID),
    companyId: normalizeBitrixScalar(raw.COMPANY_ID),
    ...(customFields ? { customFields } : {}),
  };
}
