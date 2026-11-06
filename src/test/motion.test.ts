import { assert, fixture, nextFrame } from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { html } from 'lit-html';
import { dialog } from '../index';

customElements.define(
	'motion-test-dialog',
	dialog(() => html`<p>Body</p>`)
);

const open = async () => {
	const el = await fixture(
		html`<motion-test-dialog heading="Motion"></motion-test-dialog>`
	);
	await nextFrame();
	const animations = el.shadowRoot!.querySelector('dialog')!.getAnimations();
	return animations.map((a) => (a as CSSTransition).transitionProperty).sort();
};

describe('motion', () => {
	before(() => {
		document.documentElement.style.cssText =
			'--cz-duration-fast: 150ms; --cz-duration-normal: 250ms; --cz-ease-out: ease-out';
	});

	after(() => document.documentElement.removeAttribute('style'));

	afterEach(() => emulateMedia({ reducedMotion: 'no-preference' }));

	it('fades and rises in when it opens', async () => {
		assert.deepEqual(await open(), ['opacity', 'scale']);
	});

	it('only fades in under reduced motion', async () => {
		await emulateMedia({ reducedMotion: 'reduce' });
		assert.deepEqual(await open(), ['opacity']);
	});
});
