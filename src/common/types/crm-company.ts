/**
 * Normalized CRM company (account) representation for cross-provider contracts.
 */
export type CrmCompany = Readonly<{
  readonly id: string;
  readonly name: string;
  readonly website: string | null;
  readonly industry: string | null;
}>;
