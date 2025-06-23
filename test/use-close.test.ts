import { assert } from '@open-wc/testing';
import useClose from '../src/hooks/use-close';
import { spy } from 'sinon';
import { renderHook } from './render-hook';

class MockDialog extends HTMLElement implements Partial<HTMLDialogElement> {
	open: boolean;
	returnValue: string;

	constructor() {
		super();
		this.open = true;
		this.returnValue = '';
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

customElements.define('mock-close-dialog', MockDialog);

suite('dialog/use-close', () => {
	test('returns close function that closes the dialog', async () => {
		const dialogRef = {
			current: new MockDialog(),
		};

		const hook = await renderHook(useClose, dialogRef);
		const { close } = hook.current;

		assert.isTrue(dialogRef.current.open, 'Dialog should start open');
		close();
		assert.isFalse(
			dialogRef.current.open,
			'Dialog should be closed after calling close',
		);
	});

	test('calls onClose callback when dialog is closed', async () => {
		const onClose = spy();
		const dialogRef = {
			current: new MockDialog(),
		};

		const result = await renderHook(useClose, dialogRef, onClose);
		const { close } = result.current;

		// call close and wait a tick for any async effects
		close('confirm');
		await new Promise((resolve) => setTimeout(resolve, 10));

		assert.isTrue(onClose.called, 'onClose should be called once');
	});

	test('handles cancel button clicks', async () => {
		const onClose = spy();
		const dialogRef = {
			current: new MockDialog(),
		};

		await renderHook(useClose, dialogRef, onClose);

		// simulate clicking directly on the dialog (backdrop click)
		const clickEvent = new MouseEvent('click', { bubbles: true });
		Object.defineProperty(clickEvent, 'target', {
			value: dialogRef.current,
			configurable: true,
		});

		dialogRef.current.dispatchEvent(clickEvent);
		await new Promise((resolve) => setTimeout(resolve, 10));

		assert.isTrue(
			onClose.called,
			'onClose should be called when cancel button is clicked',
		);
		assert.isFalse(
			dialogRef.current.open,
			'Dialog should be closed when cancel button is clicked',
		);
	});
});
