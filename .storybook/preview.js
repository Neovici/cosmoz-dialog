/** @type { import('@storybook/web-components').Preview } */
const preview = {
	parameters: {
		actions: { argTypesRegex: /^on[A-Z].*/u },
		controls: {
			matchers: {
				color: /(background|color)$/iu,
				date: /Date$/u,
			},
		},
	},
};

export default preview;
