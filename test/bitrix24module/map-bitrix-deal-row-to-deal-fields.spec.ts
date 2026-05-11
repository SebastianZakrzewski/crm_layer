import { mapBitrixDealRowToDealFields } from '@app/modules/bitrix24module/map-bitrix-deal-row-to-deal-fields';

describe('mapBitrixDealRowToDealFields', () => {
  it('maps raw keys to sorted labeled entries', () => {
    const raw = {
      UF_Z: 'last',
      TITLE: 'T',
      ID: '410',
      UF_A: 'first',
    };
    const labels = {
      ID: 'Identifier',
      TITLE: 'Title',
      UF_A: 'Alpha',
      UF_Z: 'Zzz',
    };
    const actualResult = mapBitrixDealRowToDealFields(raw, labels);
    expect(actualResult.dealId).toBe('410');
    expect(actualResult.fields.map((row) => row.fieldId)).toEqual([
      'ID',
      'TITLE',
      'UF_A',
      'UF_Z',
    ]);
    expect(actualResult.fields.find((row) => row.fieldId === 'UF_A')).toEqual({
      fieldId: 'UF_A',
      label: 'Alpha',
      value: 'first',
    });
    expect(actualResult.fields.find((row) => row.fieldId === 'TITLE')).toEqual({
      fieldId: 'TITLE',
      label: 'Title',
      value: 'T',
    });
  });

  it('uses null label when catalog omits the field', () => {
    const raw = { ID: '1', MYUF: 'x' };
    const actualResult = mapBitrixDealRowToDealFields(raw, {});
    expect(actualResult.fields.find((row) => row.fieldId === 'MYUF')).toEqual({
      fieldId: 'MYUF',
      label: null,
      value: 'x',
    });
  });
});
