import { ConfigService } from '@nestjs/config';
import {
  BITRIX24_WEBHOOK_BASE_URL_ENV,
  Bitrix24Client,
} from '@app/modules/bitrix24module/bitrix24.client';

describe('Bitrix24Client', () => {
  const webhookBase = 'https://example.bitrix24.com/rest/1/test-webhook';
  const originalFetch = global.fetch;

  const createClient = (): Bitrix24Client => {
    const configService = {
      get: jest
        .fn()
        .mockImplementation((key: string) =>
          key === BITRIX24_WEBHOOK_BASE_URL_ENV ? webhookBase : undefined,
        ),
    } as unknown as ConfigService;
    return new Bitrix24Client(configService);
  };

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  describe('getDeal', () => {
    it('returns mapped deal when Bitrix REST succeeds', async () => {
      const client = createClient();
      const mockFetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            result: {
              ID: '410',
              TITLE: 'New Deal #1',
              OPPORTUNITY: '1000000.00',
              CURRENCY_ID: 'EUR',
              STAGE_ID: 'PREPARATION',
              COMPANY_ID: '9',
              UF_CRM_1721244482250: 'Hello world!',
            },
            time: {},
          }),
      });
      global.fetch = mockFetch;
      const actualResult = await client.getDeal('410');
      const expectedResult = {
        id: '410',
        name: 'New Deal #1',
        amount: '1000000.00',
        currency: 'EUR',
        stageId: 'PREPARATION',
        companyId: '9',
        customFields: { UF_CRM_1721244482250: 'Hello world!' },
      };
      expect(actualResult).toEqual(expectedResult);
      expect(mockFetch).toHaveBeenCalledWith(
        `${webhookBase}/crm.deal.get`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ID: 410 }),
        }),
      );
    });

    it('returns null when Bitrix reports deal not found', async () => {
      const client = createClient();
      const mockFetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            error: 'ERROR_NOT_FOUND',
            error_description: 'Not found',
          }),
      });
      global.fetch = mockFetch;
      const actualResult = await client.getDeal('999');
      expect(actualResult).toBeNull();
    });

    it('throws when webhook base URL is missing', async () => {
      const configService = {
        get: jest.fn().mockReturnValue(undefined),
      } as unknown as ConfigService;
      const client = new Bitrix24Client(configService);
      await expect(client.getDeal('1')).rejects.toThrow(
        `${BITRIX24_WEBHOOK_BASE_URL_ENV} is not configured.`,
      );
    });

    it('throws when deal id is not a positive integer string', async () => {
      const client = createClient();
      await expect(client.getDeal('abc')).rejects.toThrow(/invalid deal id/);
    });

    it('throws when Bitrix returns a non-not-found error', async () => {
      const client = createClient();
      const mockFetch = jest.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            error: 'ACCESS_DENIED',
            error_description: 'Access denied',
          }),
      });
      global.fetch = mockFetch;
      await expect(client.getDeal('1')).rejects.toThrow(/crm.deal.get failed/);
    });

    it('throws when result payload is not an object', async () => {
      const client = createClient();
      const mockFetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ result: null }),
      });
      global.fetch = mockFetch;
      await expect(client.getDeal('1')).rejects.toThrow(/non-object result/);
    });
  });
});
