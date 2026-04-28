/**
 * Payload for creating a CRM company.
 */
export type CrmCompanyCreateInput = Readonly<{
  readonly name: string;
  readonly website?: string;
  readonly industry?: string;
}>;
