const applyPlugin = require('../index');

const getEnvPresetOptions = (result) => {
  return result.overrides[0].presets[0][1];
}

describe('babel-preset-env', () => {
  test('useBuiltIns set to false by default', () => {
    const result = applyPlugin();
    const presetOptions = getEnvPresetOptions(result);
    expect(presetOptions.useBuiltIns).toBeFalsy();
  });

  test('pass through configuration from "env" option key', () => {
    const env = {
      targets: {
        ios: '13.0'
      },
      spec: true,
      loose: true,
      modules: 'commonjs',
      debug: true,
      include: ['foo'],
      exclude: ['bar'],
      useBuiltIns: 'usage',
      corejs: 3,
      forceAllTransforms: true,
      configPath: '/tmp',
      ignoreBrowserslistConfig: true,
      shippedProposals: true
    };
    const result = applyPlugin(null, { env });
    const presetOptions = getEnvPresetOptions(result);
    expect(presetOptions).toMatchObject(env);
  });
});

describe('@babel/plugin-transform-runtime', () => {
  test('enable inline helpers when useBuiltIns is "usage"', () => {
    const env = {
      useBuiltIns: 'usage',
    };
    const result = applyPlugin(null, { env });
    const pluginOptions = result.overrides[0].plugins[0][1];
    expect(pluginOptions.helpers).toBeTruthy();
  });

  test('enable regenerator transform when useBuiltIns is not "usage"', () => {
    const env = {
      useBuiltIns: 'auto',
    };
    const result = applyPlugin(null, { env });
    const pluginOptions = result.overrides[0].plugins[0][1];
    expect(pluginOptions.regenerator).toBeTruthy();
  });
});

describe('babel-plugin-transform-titanium', () => {
  test('pass through configuration from "titanium" option key', () => {
    const titanium = {
      deploytype: 'development',
      platform: 'ios',
      Ti: {
        Platform: {
          name: 'iOS',
          osname: 'iphone'
        }
      }
    };
    const result = applyPlugin(null, { titanium });
    const pluginOptions = result.overrides[0].plugins[1][1];
    expect(pluginOptions).toMatchObject(titanium);
  });
});
