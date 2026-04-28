import type { CrmContactCreateInput } from '@app/common/types/crm-contact-create-input';

/**
 * Payload for partially updating a CRM contact.
 */
export type CrmContactUpdateInput = Readonly<Partial<CrmContactCreateInput>>;
