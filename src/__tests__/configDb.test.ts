import { Configs } from '../db/models';

describe('Test configs model', () => {
  afterEach(async () => {
    // Clearing test data
    await Configs.deleteMany({});
  });

  test('Create or update config', async () => {
    const code = 'dealCurrency';
    const value = ['MNT', 'USD', 'KRW'];

    const createdConfig = await Configs.createOrUpdateConfig({
      code,
      value,
    });

    expect(createdConfig).toBeDefined();
    expect(createdConfig.code).toEqual(code);
    expect(createdConfig.value.length).toEqual(value.length);
    expect(createdConfig.value[0]).toEqual(value[0]);

    const updateConfig = await Configs.createOrUpdateConfig({
      code,
      value: ['update'],
    });

    expect(updateConfig).toBeDefined();
    expect(updateConfig.code).toEqual(code);
    expect(updateConfig.value.length).toEqual(1);
    expect(updateConfig.value[0]).toEqual('update');
  });
});
