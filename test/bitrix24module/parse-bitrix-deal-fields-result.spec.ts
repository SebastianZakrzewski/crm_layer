import { buildBitrixDealFieldDisplayNameMap } from '@app/modules/bitrix24module/parse-bitrix-deal-fields-result';

describe('buildBitrixDealFieldDisplayNameMap', () => {
  it('prefers formLabel over listLabel and title', () => {
    const inputResult = {
      UF_1: {
        title: 'UF_1',
        listLabel: 'List name',
        formLabel: 'Form name',
      },
      UF_2: { title: 'Only title' },
      UF_3: { listLabel: 'List only', title: 'T' },
    };
    const actualResult = buildBitrixDealFieldDisplayNameMap(inputResult);
    expect(actualResult).toEqual({
      UF_1: 'Form name',
      UF_2: 'Only title',
      UF_3: 'List only',
    });
  });

  it('uses filterLabel when form and list are empty', () => {
    const inputResult = {
      X: { title: '', listLabel: ' ', formLabel: '', filterLabel: 'Filter' },
    };
    expect(buildBitrixDealFieldDisplayNameMap(inputResult)).toEqual({
      X: 'Filter',
    });
  });

  it('skips non-object metadata entries', () => {
    const inputResult = { A: 'bad', B: null, C: { title: 'OK' } };
    expect(
      buildBitrixDealFieldDisplayNameMap(
        inputResult as Record<string, unknown>,
      ),
    ).toEqual({
      C: 'OK',
    });
  });
});
