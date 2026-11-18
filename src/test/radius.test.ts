import { assert, fixture, html } from '@open-wc/testing';
import { setViewport } from '@web/test-runner-commands';
import { dialog } from '../index';

customElements.define(
	'radius-test-dialog',
	dialog(() => html`<p>Details</p>`)
);

describe('dialog radius role', () => {
	afterEach(() => setViewport({ width: 800, height: 600 }));

	it('inherits the desktop dialog role and responds to ancestor changes', async () => {
		const scope = await fixture<HTMLElement>(html`
			<div style="--cz-radius-dialog:27px;--cz-spacing:4px">
				<radius-test-dialog heading="Details"></radius-test-dialog>
			</div>
		`);
		const frame = scope
			.querySelector('radius-test-dialog')!
			.shadowRoot!.querySelector('dialog')!;
		assert.equal(getComputedStyle(frame).borderRadius, '27px');
		scope.style.setProperty('--cz-radius-dialog', '21px');
		assert.equal(getComputedStyle(frame).borderRadius, '21px');
	});

	it('uses the mobile sheet role on exposed corners', async () => {
		await setViewport({ width: 390, height: 800 });
		const scope = await fixture<HTMLElement>(html`
			<div
				style="--cz-radius-dialog:27px;--cz-radius-sheet:35px;--cz-spacing:4px"
			>
				<radius-test-dialog heading="Details"></radius-test-dialog>
			</div>
		`);
		const frame = scope
			.querySelector('radius-test-dialog')!
			.shadowRoot!.querySelector('dialog')!;
		const style = getComputedStyle(frame);
		assert.equal(style.borderTopLeftRadius, '35px');
		assert.equal(style.borderBottomLeftRadius, '0px');
	});
});
