import type { CrmDeal } from '@app/common/types/crm-deal';
import { Bitrix24Client } from '@app/modules/bitrix24module/bitrix24.client';
import { Bitrix24Service } from '@app/modules/bitrix24module/bitrix24.service';

describe('Bitrix24Service', () => {
  let service: Bitrix24Service;
  let mockBitrix24Client: jest.Mocked<Pick<Bitrix24Client, 'getDeal'>>;

  beforeEach(() => {
    mockBitrix24Client = {
      getDeal: jest.fn(),
    };
    service = new Bitrix24Service(mockBitrix24Client as unknown as Bitrix24Client);
  });

  describe('getDeal', () => {
    it('delegates to Bitrix24Client.getDeal', async () => {
      const inputDealId = '410';
      const expectedDeal: CrmDeal = {
        id: '410',
        name: 'Example',
        amount: null,
        currency: null,
        stageId: null,
        companyId: null,
      };
      mockBitrix24Client.getDeal.mockResolvedValue(expectedDeal);
      const actualResult = await service.getDeal(inputDealId);
      expect(actualResult).toEqual(expectedDeal);
      expect(mockBitrix24Client.getDeal).toHaveBeenCalledWith(inputDealId);
    });
  });
});
