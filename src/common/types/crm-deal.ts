/**
 * Normalized CRM deal (opportunity) representation for cross-provider contracts.
 */
export type CrmDeal = Readonly<{
  readonly id: string;
  readonly name: string;
  readonly amount: string | null;
  readonly currency: string | null;
  readonly stageId: string | null;
  readonly companyId: string | null;
  /**
   * Vendor-specific fields (e.g. Bitrix UF_*), not mapped to fixed properties.
   */
  readonly customFields?: Readonly<
    Record<
      string,
      string | number | boolean | null | readonly string[] | readonly number[]
    >
  >;
  /**
   * Bitrix API field id → label from `crm.deal.fields` (covers {@link customFields} keys and core keys ID, TITLE, …).
   */
  readonly fieldLabels?: Readonly<Record<string, string>>;
}>;
