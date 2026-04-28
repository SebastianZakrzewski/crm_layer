/**
 * Normalized CRM lead representation for cross-provider contracts.
 */
export type CrmLead = Readonly<{
  readonly id: string;
  readonly title: string | null;
  readonly status: string | null;
  readonly email: string | null;
  readonly companyName: string | null;
}>;
