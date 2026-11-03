import { assert, fixture, nextFrame } from '@open-wc/testing';
import { css } from '@pionjs/pion';
import { setViewport } from '@web/test-runner-commands';
import { html } from 'lit-html';
import { dialog } from '../index';

customElements.define(
	'sheet-test-dialog',
	dialog(() => html`<p class="extra">Body</p>`, {
		styleSheets: [
			css`
				.extra {
					color: rgb(1, 2, 3);
				}
			`,
		],
	})
);

const dialogOf = (el: Element) => el.shadowRoot!.querySelector('dialog')!;
const sheetOf = (el: Element) => el.shadowRoot!.querySelector('.sheet')!;

describe('sheet', () => {
	afterEach(() => setViewport({ width: 800, height: 600 }));

	it('docks to the bottom edge on narrow viewports', async () => {
		await setViewport({ width: 390, height: 800 });
		const el = await fixture(
			html`<sheet-test-dialog heading="Sheet"></sheet-test-dialog>`
		);
		await nextFrame();
		const rect = dialogOf(el).getBoundingClientRect();
		assert.closeTo(rect.bottom, innerHeight, 1);
		assert.closeTo(rect.width, innerWidth, 1);
	});

	it('floats on wide viewports and does not move when docked', async () => {
		const el = await fixture(
			html`<sheet-test-dialog heading="Sheet"></sheet-test-dialog>`
		);
		await nextFrame();
		assert.isBelow(
			dialogOf(el).getBoundingClientRect().bottom,
			innerHeight - 1
		);

		await setViewport({ width: 390, height: 800 });
		const title = el.shadowRoot!.querySelector('.title')!;
		title.dispatchEvent(
			new MouseEvent('mousedown', { bubbles: true, composed: true })
		);
		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 10, clientY: 10 })
		);
		document.dispatchEvent(new MouseEvent('mouseup'));
		assert.equal(dialogOf(el).style.top, '');
	});

	it('adds styleSheets to the base styles instead of replacing them', async () => {
		const el = await fixture(
			html`<sheet-test-dialog heading="Styled"></sheet-test-dialog>`
		);
		const body = el.shadowRoot!.querySelector('.extra')!;
		assert.equal(getComputedStyle(body).color, 'rgb(1, 2, 3)');
		assert.equal(getComputedStyle(sheetOf(el)).flexDirection, 'column');
	});

	it('locks the page scroll while the sheet is open', async () => {
		await setViewport({ width: 390, height: 800 });
		const el = await fixture(
			html`<sheet-test-dialog heading="Sheet"></sheet-test-dialog>`
		);
		const de = document.documentElement;
		await nextFrame();
		assert.equal(getComputedStyle(de).overflow, 'hidden');
		await new Promise((r) => setTimeout(r, 700));
		assert.equal(de.scrollHeight - de.clientHeight, 0);
		dialogOf(el).close();
		await nextFrame();
		assert.equal(getComputedStyle(de).overflow, 'visible');
	});
});
