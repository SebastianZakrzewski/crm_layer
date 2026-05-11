import type { CrmDeal } from '@app/common/types/crm-deal';
import { attachBitrixDealFieldLabels } from '@app/modules/bitrix24module/attach-bitrix-deal-field-labels';

describe('attachBitrixDealFieldLabels', () => {
  it('adds labels for core Bitrix keys and customFields', () => {
    const inputDeal: CrmDeal = {
      id: '1',
      name: 'D',
      amount: '10',
      currency: 'PLN',
      stageId: 'S',
      companyId: '9',
      customFields: {
        TYPE_ID: 'SALE',
        UF_CRM_1760788285332: 'Skoda',
      },
    };
    const displayMap = {
      ID: 'ID',
      TITLE: 'Nazwa',
      OPPORTUNITY: 'Razem',
      CURRENCY_ID: 'Waluta',
      STAGE_ID: 'Etap deala',
      COMPANY_ID: 'Firma',
      TYPE_ID: 'Typ deala',
      UF_CRM_1760788285332: 'Marka samochodu',
    };
    const actualResult = attachBitrixDealFieldLabels(inputDeal, displayMap);
    expect(actualResult.fieldLabels).toEqual({
      ID: 'ID',
      TITLE: 'Nazwa',
      OPPORTUNITY: 'Razem',
      CURRENCY_ID: 'Waluta',
      STAGE_ID: 'Etap deala',
      COMPANY_ID: 'Firma',
      TYPE_ID: 'Typ deala',
      UF_CRM_1760788285332: 'Marka samochodu',
    });
  });

  it('falls back to API key when custom field has no catalog entry', () => {
    const inputDeal: CrmDeal = {
      id: '1',
      name: 'D',
      amount: null,
      currency: null,
      stageId: null,
      companyId: null,
      customFields: { UNKNOWN_UF: 'x' },
    };
    const actualResult = attachBitrixDealFieldLabels(inputDeal, {
      ID: 'ID',
    });
    expect(actualResult.fieldLabels?.UNKNOWN_UF).toBe('UNKNOWN_UF');
  });

  it('returns deal unchanged when there are no labels to attach', () => {
    const inputDeal: CrmDeal = {
      id: '1',
      name: 'D',
      amount: null,
      currency: null,
      stageId: null,
      companyId: null,
    };
    const actualResult = attachBitrixDealFieldLabels(inputDeal, {});
    expect(actualResult).toBe(inputDeal);
  });
});
