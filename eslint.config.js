import neoviciConfig from '@neovici/cfg/eslint/index.mjs';

const ignores = {
	ignores: [
		'coverage/',
		'dist/',
		'node_modules/**',
		'__snapshots__',
		'**/stories/',
		'**/.storybook/',
	],
};

const customRules = {
	languageOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	rules: {
		'max-lines-per-function': 0,
		'import/group-exports': 0,
	},
};

export default [ignores, ...neoviciConfig, customRules];
