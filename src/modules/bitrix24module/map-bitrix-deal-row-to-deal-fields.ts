import type { DealFields } from '@app/common/types/crm-deal-fields';
import { BITRIX_DEAL_CORE_FIELD_KEYS } from './map-bitrix-deal-row-to-crm-deal';

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
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  if (Array.isArray(value)) {
    if (value.every((item): item is string => typeof item === 'string')) {
      return value;
    }
    if (
      value.every(
        (item): item is number =>
          typeof item === 'number' && Number.isFinite(item),
      )
    ) {
      return value;
    }
  }
  return undefined;
}

function resolveCoreFieldValue(
  key: string,
  raw: Readonly<Record<string, unknown>>,
): string | null {
  if (key === 'ID') {
    const idRaw = raw.ID;
    if (typeof idRaw === 'string' || typeof idRaw === 'number') {
      return String(idRaw).trim();
    }
    return '';
  }
  if (key === 'TITLE') {
    const titleRaw = raw.TITLE;
    return typeof titleRaw === 'string' ? titleRaw : '';
  }
  return normalizeBitrixScalar(raw[key]);
}

/**
 * Maps a Bitrix24 `crm.deal.get` row plus `crm.deal.fields` labels into {@link DealFields}.
 */
export function mapBitrixDealRowToDealFields(
  raw: Readonly<Record<string, unknown>>,
  labelByFieldId: Readonly<Record<string, string>>,
): DealFields {
  const idRaw = raw.ID;
  const dealId =
    typeof idRaw === 'string' || typeof idRaw === 'number'
      ? String(idRaw).trim()
      : '';
  const rows: DealFields['fields'][number][] = [];
  for (const key of Object.keys(raw).sort((a, b) => a.localeCompare(b))) {
    let value:
      | string
      | number
      | boolean
      | null
      | readonly string[]
      | readonly number[]
      | undefined;
    if (BITRIX_DEAL_CORE_FIELD_KEYS.has(key)) {
      value = resolveCoreFieldValue(key, raw);
    } else {
      value = normalizeBitrixCustomValue(raw[key]);
    }
    if (value === undefined) {
      continue;
    }
    const labelRaw = labelByFieldId[key];
    const label =
      labelRaw !== undefined && labelRaw.trim() !== '' ? labelRaw.trim() : null;
    rows.push({ fieldId: key, label, value });
  }
  return { dealId, fields: rows };
}
