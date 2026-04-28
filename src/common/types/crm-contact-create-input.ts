/**
 * Payload for creating a CRM contact.
 */
export type CrmContactCreateInput = Readonly<{
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly companyId?: string;
}>;
