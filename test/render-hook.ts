import { component, html } from '@pionjs/pion';

/**
 * renderHook utility for testing Pion hooks within proper component context
 */
export const renderHook = async <T, TArgs extends readonly unknown[]>(
	hook: (...args: TArgs) => T,
	...args: TArgs
): Promise<{ current: T }> => {
	let result!: T;

	// Create a proper Pion component that uses the hook
	const TestComponent = component(() => {
		result = hook(...args);
		return html`<div></div>`;
	});

	// Generate a unique tag name for this test
	const tagName = `test-component-${Math.random().toString(36).substr(2, 9)}`;

	// Define the custom element
	customElements.define(tagName, TestComponent);

	// Create a test element and render the component
	const element = document.createElement('div');
	document.body.appendChild(element);

	try {
		// Create and append the custom element
		const testElement = document.createElement(tagName);
		element.appendChild(testElement);

		// Wait a microtask for any async operations
		await new Promise<void>((resolve) => queueMicrotask(resolve));

		return { current: result };
	} finally {
		document.body.removeChild(element);
	}
};
