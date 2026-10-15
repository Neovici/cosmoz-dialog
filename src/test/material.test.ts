import { assert, fixture, html } from '@open-wc/testing';
import { dialog } from '../index';

customElements.define(
	'material-test-dialog',
	dialog(() => html`<p>Review</p>`)
);

describe('optional dialog material', () => {
	it('applies overlay materials and restores the original surface', async () => {
		const el = await fixture<HTMLElement>(
			html`<material-test-dialog></material-test-dialog>`
		);
		const surface = el.shadowRoot!.querySelector('dialog')!;
		const original = getComputedStyle(surface).background;
		el.style.setProperty(
			'--cz-material-overlay-background',
			'linear-gradient(white, transparent) navy'
		);
		el.style.setProperty('--cz-material-blur', 'blur(12px)');
		assert.include(
			getComputedStyle(surface).backgroundImage,
			'linear-gradient'
		);
		assert.equal(getComputedStyle(surface).backgroundColor, 'rgb(0, 0, 128)');
		assert.equal(getComputedStyle(surface).backdropFilter, 'blur(12px)');
		el.style.removeProperty('--cz-material-overlay-background');
		el.style.removeProperty('--cz-material-blur');
		assert.equal(getComputedStyle(surface).background, original);
		assert.equal(getComputedStyle(surface).backdropFilter, 'none');
	});
});
