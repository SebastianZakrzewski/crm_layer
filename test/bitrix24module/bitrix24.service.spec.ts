import type { CrmDeal } from '@app/common/types/crm-deal';
import type { DealFields } from '@app/common/types/crm-deal-fields';
import { Bitrix24Client } from '@app/modules/bitrix24module/bitrix24.client';
import { Bitrix24Service } from '@app/modules/bitrix24module/bitrix24.service';

describe('Bitrix24Service', () => {
  let service: Bitrix24Service;
  let mockBitrix24Client: jest.Mocked<
    Pick<
      Bitrix24Client,
      'getDeal' | 'getCrmDealFieldDisplayNameMap' | 'getFields'
    >
  >;

  beforeEach(() => {
    mockBitrix24Client = {
      getDeal: jest.fn(),
      getCrmDealFieldDisplayNameMap: jest.fn(),
      getFields: jest.fn(),
    };
    service = new Bitrix24Service(
      mockBitrix24Client as unknown as Bitrix24Client,
    );
  });

  describe('getDeal', () => {
    it('loads deal then attaches field labels from catalog', async () => {
      const inputDealId = '410';
      const rawDeal: CrmDeal = {
        id: '410',
        name: 'Example',
        amount: null,
        currency: null,
        stageId: null,
        companyId: null,
        customFields: { TYPE_ID: 'SALE' },
      };
      const catalog = { TYPE_ID: 'Typ deala', ID: 'ID', TITLE: 'Nazwa' };
      mockBitrix24Client.getDeal.mockResolvedValue(rawDeal);
      mockBitrix24Client.getCrmDealFieldDisplayNameMap.mockResolvedValue({
        ...catalog,
        OPPORTUNITY: 'Razem',
        CURRENCY_ID: 'Waluta',
        STAGE_ID: 'Etap',
        COMPANY_ID: 'Firma',
      });
      const actualResult = await service.getDeal(inputDealId);
      expect(actualResult?.fieldLabels?.TYPE_ID).toBe('Typ deala');
      expect(mockBitrix24Client.getDeal).toHaveBeenCalledWith(inputDealId);
      expect(
        mockBitrix24Client.getCrmDealFieldDisplayNameMap,
      ).toHaveBeenCalled();
    });

    it('returns null without calling field catalog when deal is missing', async () => {
      mockBitrix24Client.getDeal.mockResolvedValue(null);
      const actualResult = await service.getDeal('999');
      expect(actualResult).toBeNull();
      expect(
        mockBitrix24Client.getCrmDealFieldDisplayNameMap,
      ).not.toHaveBeenCalled();
    });
  });

  describe('getDealFields', () => {
    it('delegates to Bitrix24Client.getFields', async () => {
      const expectedFields: DealFields = {
        dealId: '1',
        fields: [],
      };
      mockBitrix24Client.getFields.mockResolvedValue(expectedFields);
      const actualResult = await service.getDealFields('1');
      expect(actualResult).toEqual(expectedFields);
      expect(mockBitrix24Client.getFields).toHaveBeenCalledWith('1');
    });
  });
});
