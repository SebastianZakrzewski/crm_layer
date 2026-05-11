/**
 * Provider-normalized deal field snapshot: stable ids with optional catalog labels and raw scalar values.
 */
export type DealFields = Readonly<{
  readonly dealId: string;
  readonly fields: ReadonlyArray<
    Readonly<{
      readonly fieldId: string;
      readonly label: string | null;
      readonly value:
        | string
        | number
        | boolean
        | null
        | readonly string[]
        | readonly number[];
    }>
  >;
}>;
