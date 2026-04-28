/**
 * Common list query parameters for CRM entity endpoints.
 */
export type CrmListOptions = Readonly<{
  readonly limit?: number;
  readonly cursor?: string;
  readonly query?: string;
}>;
