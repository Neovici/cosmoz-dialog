import { assert, fixture, nextFrame, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit-html';
import { dialog } from '../index';

customElements.define(
	'escape-dialog',
	dialog(() => html`<input />`)
);

const setup = async (uncancelable = false) => {
	let closed = 0;
	const el = await fixture(
		html`<escape-dialog
			heading="Edit"
			?uncancelable=${uncancelable}
			.onClose=${() => closed++}
		></escape-dialog>`
	);
	const dlg = el.shadowRoot!.querySelector('dialog')!,
		input = el.shadowRoot!.querySelector('input')!;
	await waitUntil(() => dlg.open);
	input.focus();
	return { dlg, input, closed: () => closed };
};

describe('dialog escape', () => {
	it('closes on Escape', async () => {
		const { closed } = await setup();
		await sendKeys({ press: 'Escape' });
		await waitUntil(() => closed() === 1);
	});

	it('ignores Escape when uncancelable', async () => {
		const { dlg, closed } = await setup(true);
		// The second Escape has no user activation to spend
		await sendKeys({ press: 'Escape' });
		await sendKeys({ press: 'Escape' });
		await nextFrame();
		assert.isTrue(dlg.open);
		assert.equal(closed(), 0);
	});

	it('stays open when a control inside handled Escape', async () => {
		const { dlg, input, closed } = await setup();
		input.addEventListener(
			'keydown',
			(e) => e.key === 'Escape' && e.preventDefault()
		);
		await sendKeys({ press: 'Escape' });
		await nextFrame();
		assert.isTrue(dlg.open);
		assert.equal(closed(), 0);
	});
});
