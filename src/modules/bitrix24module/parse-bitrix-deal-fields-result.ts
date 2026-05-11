function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function pickFirstNonEmptyString(
  ...candidates: readonly unknown[]
): string | undefined {
  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed !== '') {
        return trimmed;
      }
    }
  }
  return undefined;
}

/**
 * Builds field id → display name from Bitrix24 `crm.deal.fields` `result`.
 * Prefers `formLabel` / `listLabel` (correct for `UF_*`); falls back to `filterLabel` and `title`.
 * @see https://apidocs.bitrix24.com/api-reference/crm/deals/crm-deal-fields.html
 */
export function buildBitrixDealFieldDisplayNameMap(
  fieldsResult: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const [key, meta] of Object.entries(fieldsResult)) {
    if (!isRecord(meta)) {
      continue;
    }
    const label = pickFirstNonEmptyString(
      meta.formLabel,
      meta.listLabel,
      meta.filterLabel,
      meta.title,
    );
    if (label !== undefined) {
      out[key] = label;
    }
  }
  return out;
}
