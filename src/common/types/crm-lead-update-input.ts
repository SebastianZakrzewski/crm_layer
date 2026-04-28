import type { CrmLeadCreateInput } from '@app/common/types/crm-lead-create-input';

/**
 * Payload for partially updating a CRM lead.
 */
export type CrmLeadUpdateInput = Readonly<Partial<CrmLeadCreateInput>>;
