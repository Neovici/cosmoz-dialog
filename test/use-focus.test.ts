import { assert } from '@open-wc/testing';
import useFocus from '../src/hooks/use-focus';
import { renderHook } from './render-hook';

class MockDialog extends HTMLElement implements Partial<HTMLDialogElement> {
	_focusWithin: boolean;
	button: HTMLButtonElement;
	open: boolean;
	returnValue: string;

	constructor() {
		super();
		this._focusWithin = false;
		this.open = false;
		this.returnValue = '';

		// create a focusable element
		this.button = document.createElement('button');
		this.button.textContent = 'Focus me';
		this.appendChild(this.button);
	}

	querySelector(selector: string): Element | null {
		if (selector.includes('button')) {
			return this.button;
		}
		return null;
	}

	matches(selector: string): boolean {
		if (selector === ':focus-within') {
			return this._focusWithin;
		}
		return false;
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

customElements.define('mock-focus-dialog', MockDialog);

suite('dialog/use-focus', () => {
	test('focuses first focusable element when manualFocus is false', async () => {
		const dialog = new MockDialog();
		const dialogRef = { current: dialog };

		let focusCalled = false;
		dialog.button.focus = () => {
			focusCalled = true;
		};

		await renderHook(useFocus, dialogRef, false);

		assert.isTrue(
			focusCalled,
			'Focus should be called on the first focusable element',
		);
	});

	test('does not focus when manualFocus is true', async () => {
		const dialog = new MockDialog();
		const dialogRef = { current: dialog };

		let focusCalled = false;
		dialog.button.focus = () => {
			focusCalled = true;
		};

		await renderHook(useFocus, dialogRef, true);

		assert.isFalse(
			focusCalled,
			'Focus should not be called when manualFocus is true',
		);
	});

	test('does not focus when dialog already has focus', async () => {
		const dialog = new MockDialog();
		const dialogRef = { current: dialog };

		dialog._focusWithin = true;

		let focusCalled = false;
		dialog.button.focus = () => {
			focusCalled = true;
		};

		await renderHook(useFocus, dialogRef, false);

		assert.isFalse(
			focusCalled,
			'Focus should not be called when dialog already has focus',
		);
	});
});
