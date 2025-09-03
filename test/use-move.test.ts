import { assert } from '@open-wc/testing';
import useMove from '../src/hooks/use-move';
import { renderHook } from './render-hook';

class MockDialog extends HTMLElement implements Partial<HTMLDialogElement> {
	open: boolean;
	returnValue: string;

	constructor() {
		super();
		this.open = false;
		this.returnValue = '';

		const title = document.createElement('div');
		title.className = 'title';
		this.appendChild(title);
	}

	querySelector(selector: string): Element | null {
		if (selector === '.title') {
			return this.firstElementChild;
		}
		return null;
	}

	getBoundingClientRect(): DOMRect {
		return {
			x: 100,
			y: 100,
			width: 300,
			height: 200,
			left: 100,
			top: 100,
			right: 400,
			bottom: 300,
			toJSON: () => ({}),
		} as DOMRect;
	}

	close() {
		this.open = false;
		this.dispatchEvent(new Event('close'));
	}

	show() {
		this.open = true;
	}

	showModal() {
		this.open = true;
	}
}

customElements.define('mock-move-dialog', MockDialog);

suite('dialog/use-move', () => {
	test('enables dialog movement when unmovable is false', async () => {
		const dialog = new MockDialog();
		const dialogRef = { current: dialog };

		await renderHook(useMove, dialogRef, false);

		const title = dialog.querySelector('.title');
		if (!title) throw new Error('Title element not found');
		const mousedownEvent = new MouseEvent('mousedown', {
			clientX: 150,
			clientY: 120,
			bubbles: true,
		});

		Object.defineProperty(mousedownEvent, 'target', {
			value: {
				closest: (selector: string) => (selector === '.title' ? title : null),
			},
		});

		title.dispatchEvent(mousedownEvent);

		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 200, clientY: 150 }),
		);

		assert.equal(
			dialog.style.position,
			'fixed',
			'Dialog position should be fixed',
		);
		assert.equal(
			dialog.style.left,
			'150px',
			'Dialog left position should be updated',
		);
		assert.equal(
			dialog.style.top,
			'130px',
			'Dialog top position should be updated',
		);

		// simulate mouse up to end dragging
		document.dispatchEvent(new MouseEvent('mouseup'));
	});

	test('does not enable dialog movement when unmovable is true', async () => {
		const dialog = new MockDialog();
		const dialogRef = { current: dialog };

		await renderHook(useMove, dialogRef, true); // Dialog should not be movable

		const title = dialog.querySelector('.title');
		if (!title) throw new Error('Title element not found');
		const mousedownEvent = new MouseEvent('mousedown', {
			clientX: 150,
			clientY: 120,
			bubbles: true,
		});

		Object.defineProperty(mousedownEvent, 'target', {
			value: {
				closest: (selector: string) => (selector === '.title' ? title : null),
			},
		});

		title.dispatchEvent(mousedownEvent);

		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 200, clientY: 150 }),
		);

		assert.equal(dialog.style.position, '');
		assert.equal(dialog.style.left, '');
		assert.equal(dialog.style.top, '');
	});
});
