import { assert, fixture } from '@open-wc/testing';
import { init } from 'i18next';
import { html } from 'lit-html';
import { dialog } from '../index';

init({ lng: 'en', resources: {} });

customElements.define(
	'a11y-dialog',
	dialog(() => html`<p>Text</p>`)
);

const dialogOf = (el: Element) => el.shadowRoot!.querySelector('dialog')!;

describe('dialog accessible name', () => {
	it('is named by its heading and described by its subtitle', async () => {
		const el = await fixture(
			html`<a11y-dialog
				heading="Edit user"
				subtitle="Changes apply now"
				closeable
			></a11y-dialog>`
		);
		const dlg = dialogOf(el),
			root = el.shadowRoot!;
		assert.equal(dlg.getAttribute('aria-labelledby'), 'heading');
		assert.equal(root.getElementById('heading')!.textContent, 'Edit user');
		assert.equal(dlg.getAttribute('aria-describedby'), 'subtitle');
		assert.equal(
			root.getElementById('subtitle')!.textContent,
			'Changes apply now'
		);
		assert.isNull(dlg.getAttribute('role'));
	});

	it('has no description without a subtitle', async () => {
		const el = await fixture(html`<a11y-dialog heading="Edit"></a11y-dialog>`);
		assert.isFalse(dialogOf(el).hasAttribute('aria-describedby'));
	});

	it('names the close button without showing the text', async () => {
		const el = await fixture(
			html`<a11y-dialog heading="Edit" closeable></a11y-dialog>`
		);
		const close = el.shadowRoot!.querySelector('.close')!;
		assert.equal(close.textContent!.trim(), 'Close');
		assert.isAtMost(
			close.querySelector('.visually-hidden')!.getBoundingClientRect().width,
			1
		);
	});

	it('renders as an alertdialog when alert is set', async () => {
		const el = await fixture(
			html`<a11y-dialog heading="Delete?" alert></a11y-dialog>`
		);
		assert.equal(dialogOf(el).getAttribute('role'), 'alertdialog');
	});
});
