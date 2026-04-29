import { NotFoundException } from '@nestjs/common';
import { Bitrix24Controller } from '@app/modules/bitrix24module/bitrix24.controller';
import type { CrmDeal } from '@app/common/types/crm-deal';
import { Bitrix24Service } from '@app/modules/bitrix24module/bitrix24.service';

describe('Bitrix24Controller', () => {
  let controller: Bitrix24Controller;
  let mockBitrix24Service: jest.Mocked<Pick<Bitrix24Service, 'getDeal'>>;

  beforeEach(() => {
    mockBitrix24Service = {
      getDeal: jest.fn(),
    };
    controller = new Bitrix24Controller(mockBitrix24Service as unknown as Bitrix24Service);
  });

  describe('adminTest', () => {
    it('returns a fixed smoke payload', () => {
      const actualResult = controller.adminTest();
      const expectedResult = { ok: true, provider: 'bitrix24' } as const;
      expect(actualResult).toEqual(expectedResult);
    });
  });

  describe('getDeal', () => {
    it('returns the deal when the service resolves a row', async () => {
      const inputDealId = '410';
      const expectedDeal: CrmDeal = {
        id: '410',
        name: 'Example',
        amount: null,
        currency: null,
        stageId: null,
        companyId: null,
      };
      mockBitrix24Service.getDeal.mockResolvedValue(expectedDeal);
      const actualResult = await controller.getDeal({ dealId: inputDealId });
      expect(actualResult).toEqual(expectedDeal);
      expect(mockBitrix24Service.getDeal).toHaveBeenCalledWith(inputDealId);
    });

    it('throws NotFoundException when the service resolves null', async () => {
      const inputDealId = '999';
      mockBitrix24Service.getDeal.mockResolvedValue(null);
      await expect(controller.getDeal({ dealId: inputDealId })).rejects.toThrow(NotFoundException);
      expect(mockBitrix24Service.getDeal).toHaveBeenCalledWith(inputDealId);
    });
  });
});
