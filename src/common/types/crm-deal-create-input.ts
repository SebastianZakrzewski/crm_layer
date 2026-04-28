/**
 * Payload for creating a CRM deal.
 */
export type CrmDealCreateInput = Readonly<{
  readonly name: string;
  readonly amount?: string;
  readonly currency?: string;
  readonly stageId?: string;
  readonly companyId?: string;
}>;
