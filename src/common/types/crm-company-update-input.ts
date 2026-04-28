import type { CrmCompanyCreateInput } from '@app/common/types/crm-company-create-input';

/**
 * Payload for partially updating a CRM company.
 */
export type CrmCompanyUpdateInput = Readonly<
  Partial<Omit<CrmCompanyCreateInput, 'name'>> & { readonly name?: string }
>;
