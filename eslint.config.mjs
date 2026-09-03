import cfg from '@neovici/cfg/eslint/index.mjs';

export default [
	...cfg,
	{
		ignores: ['dist/', 'coverage/', 'storybook-static/'],
	},
	{
		files: ['test/**/*.ts'],
		rules: {
			'@typescript-eslint/no-unused-expressions': 'off',
		},
	},
];
