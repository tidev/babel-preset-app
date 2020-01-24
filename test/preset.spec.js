const applyPlugin = require('../index');

const getEnvPresetOptions = (result) => {
	return result.overrides[0].presets[0][1];
};

describe('babel-preset-env', () => {
	it('useBuiltIns set to false by default', () => {
		expect.assertions(1);
		const result = applyPlugin();
		const presetOptions = getEnvPresetOptions(result);
		expect(presetOptions.useBuiltIns).toBe(false);
	});

	it('pass through configuration from "env" option key', () => {
		expect.assertions(1);
		const env = {
			targets: {
				ios: '13.0'
			},
			spec: true,
			loose: true,
			modules: 'commonjs',
			debug: true,
			include: [ 'foo' ],
			exclude: [ 'bar' ],
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
	it('enable inline helpers only when useBuiltIns is "usage"', () => {
		expect.assertions(2);
		const env = {
			useBuiltIns: 'usage',
		};
		const result = applyPlugin(null, { env });
		const pluginOptions = result.overrides[0].plugins[0][1];
		expect(pluginOptions.helpers).toBe(true);
		expect(pluginOptions.regenerator).toBe(false);
	});

	it('enable regenerator transform only when useBuiltIns is not "usage"', () => {
		expect.assertions(2);
		const env = {
			useBuiltIns: 'auto',
		};
		const result = applyPlugin(null, { env });
		const pluginOptions = result.overrides[0].plugins[0][1];
		expect(pluginOptions.helpers).toBe(false);
		expect(pluginOptions.regenerator).toBe(true);
	});
});

describe('babel-plugin-transform-titanium', () => {
	it('pass through configuration from "titanium" option key', () => {
		expect.assertions(1);
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
