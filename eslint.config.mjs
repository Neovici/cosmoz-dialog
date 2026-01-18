import neoviciConfig from '@neovici/cfg/eslint/index.mjs';

export default [
	{
		ignores: [
			'coverage/**',
		],
	},
	...neoviciConfig,
];
