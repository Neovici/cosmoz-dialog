import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
	files: 'test/**/*.test.{ts,js}',
	nodeResolve: true,
	preserveSymlinks: true,
	browsers: [
		playwrightLauncher({ product: 'chromium' }),
		playwrightLauncher({ product: 'firefox' }),
	],
	plugins: [
		esbuildPlugin({
			ts: true,
			target: 'auto',
		}),
	],
	coverage: true,
	coverageConfig: {
		include: ['src/**/*.ts'],
		exclude: ['src/**/*.test.ts', 'src/**/*.stories.ts'],
	},
	testFramework: {
		config: {
			timeout: 5000,
			ui: 'tdd', // Use TDD interface which provides suite() and test()
		},
	},
};