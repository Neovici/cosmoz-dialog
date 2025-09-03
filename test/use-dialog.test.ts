import { assert } from '@open-wc/testing';
import useDialog from '../src/hooks/use-dialog';
import { spy } from 'sinon';
import { renderHook } from './render-hook';

class MockDialog extends HTMLElement implements Partial<HTMLDialogElement> {
	open: boolean;
	returnValue: string;

	constructor() {
		super();
		this.open = false;
		this.returnValue = '';
	}

	showModal() {
		this.open = true;
	}

	show() {
		this.open = true;
	}

	close() {
		this.open = false;
		this.dispatchEvent(new Event('close'));
	}
}

customElements.define('mock-dialog', MockDialog);

suite('dialog/use-dialog', () => {
	test('opens dialog when open prop is true', async () => {
		const dialogRef = {
			current: new MockDialog(),
		};
		const props = { open: true };
		const host = document.createElement('div');

		// Connect the dialog to the DOM so isConnected check passes
		document.body.appendChild(dialogRef.current);

		try {
			await renderHook(useDialog, dialogRef, props, host);

			assert.isTrue(dialogRef.current.open, 'Dialog should be open');
		} finally {
			// Clean up
			document.body.removeChild(dialogRef.current);
		}
	});

	test('closes dialog when open prop is false', async () => {
		const dialogRef = {
			current: new MockDialog(),
		};
		dialogRef.current.open = true;

		const props = { open: false };
		const host = document.createElement('div');

		await renderHook(useDialog, dialogRef, props, host);

		assert.isFalse(dialogRef.current.open, 'Dialog should be closed');
	});

	test('calls onClose when dialog is closed', async () => {
		const onClose = spy();
		const dialogRef = {
			current: new MockDialog(),
		};
		dialogRef.current.open = true;

		const props = { onClose };
		const host = document.createElement('div');

		const result = await renderHook(useDialog, dialogRef, props, host);
		const { close } = result.current;

		// call close and wait for event to propagate
		close();

		// wait for any async operations to complete
		await new Promise((resolve) => setTimeout(resolve, 10));

		assert.isTrue(onClose.called, 'onClose should be called');
		assert.isFalse(dialogRef.current.open, 'Dialog should be closed');
	});

	test('removes open attribute from host when dialog is closed', async () => {
		const dialogRef = {
			current: new MockDialog(),
		};
		dialogRef.current.open = true;

		const props = {};
		const host = document.createElement('div');
		host.setAttribute('open', '');

		await renderHook(useDialog, dialogRef, props, host);

		dialogRef.current.close();

		assert.isFalse(
			host.hasAttribute('open'),
			'Host should not have open attribute',
		);
	});
});
