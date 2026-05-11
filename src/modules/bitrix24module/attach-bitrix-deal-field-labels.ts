import type { CrmDeal } from '@app/common/types/crm-deal';
import { BITRIX_DEAL_CORE_FIELD_KEYS } from './map-bitrix-deal-row-to-crm-deal';

/**
 * Sets {@link CrmDeal.fieldLabels} for mapped core Bitrix keys and every `customFields` key, using `crm.deal.fields` display names.
 */
export function attachBitrixDealFieldLabels(
  deal: CrmDeal,
  displayNameByKey: Readonly<Record<string, string>>,
): CrmDeal {
  const fieldLabels: Record<string, string> = {};
  for (const key of BITRIX_DEAL_CORE_FIELD_KEYS) {
    const label = displayNameByKey[key];
    if (label !== undefined) {
      fieldLabels[key] = label;
    }
  }
  if (deal.customFields) {
    for (const key of Object.keys(deal.customFields)) {
      const label = displayNameByKey[key];
      fieldLabels[key] =
        label !== undefined && label.trim() !== '' ? label.trim() : key;
    }
  }
  const hasLabels = Object.keys(fieldLabels).length > 0;
  return hasLabels ? { ...deal, fieldLabels } : deal;
}
