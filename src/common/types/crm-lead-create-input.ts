/**
 * Payload for creating a CRM lead.
 */
export type CrmLeadCreateInput = Readonly<{
  readonly title?: string;
  readonly status?: string;
  readonly email?: string;
  readonly companyName?: string;
}>;
