/**
 * Paginated list wrapper returned by CRM list operations.
 */
export type CrmListResult<T> = Readonly<{
  readonly items: readonly T[];
  readonly nextCursor?: string;
  readonly total?: number;
}>;
