/**
 * Normalized CRM contact representation for cross-provider contracts.
 */
export type CrmContact = Readonly<{
  readonly id: string;
  readonly email: string | null;
  readonly firstName: string | null;
  readonly lastName: string | null;
  readonly phone: string | null;
  readonly companyId: string | null;
}>;
