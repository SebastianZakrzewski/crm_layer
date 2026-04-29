import { mapBitrixDealRowToCrmDeal } from '@app/modules/bitrix24module/map-bitrix-deal-row-to-crm-deal';

describe('mapBitrixDealRowToCrmDeal', () => {
  it('maps core deal fields and carries user fields into customFields', () => {
    const inputRow = {
      ID: '410',
      TITLE: 'New Deal #1',
      OPPORTUNITY: '1000000.00',
      CURRENCY_ID: 'EUR',
      STAGE_ID: 'PREPARATION',
      COMPANY_ID: '9',
      UF_CRM_1721244482250: 'Hello world!',
      CONTACT_ID: '84',
    };
    const actualResult = mapBitrixDealRowToCrmDeal(inputRow);
    const expectedResult = {
      id: '410',
      name: 'New Deal #1',
      amount: '1000000.00',
      currency: 'EUR',
      stageId: 'PREPARATION',
      companyId: '9',
      customFields: {
        UF_CRM_1721244482250: 'Hello world!',
        CONTACT_ID: '84',
      },
    };
    expect(actualResult).toEqual(expectedResult);
  });

  it('normalizes nullables and omits customFields when empty', () => {
    const inputRow = {
      ID: 55,
      TITLE: 'Minimal',
      OPPORTUNITY: null,
      CURRENCY_ID: '',
      STAGE_ID: undefined,
      COMPANY_ID: '0',
    };
    const actualResult = mapBitrixDealRowToCrmDeal(inputRow as Record<string, unknown>);
    expect(actualResult).toEqual({
      id: '55',
      name: 'Minimal',
      amount: null,
      currency: null,
      stageId: null,
      companyId: '0',
    });
    expect(actualResult.customFields).toBeUndefined();
  });
});
