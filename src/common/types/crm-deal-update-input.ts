import type { CrmDealCreateInput } from '@app/common/types/crm-deal-create-input';

/**
 * Payload for partially updating a CRM deal.
 */
export type CrmDealUpdateInput = Readonly<Partial<CrmDealCreateInput>>;
