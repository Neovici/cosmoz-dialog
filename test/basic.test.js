/* eslint-disable max-lines */
import { expect, html, fixture, oneEvent, aTimeout } from '@open-wc/testing';
import '../cosmoz-dialog';

const flushDialog = dialog => {
		dialog._observer.flush();
		return dialog;
	},
	basicDialog = async () => flushDialog(await fixture(html`<cosmoz-dialog with-backdrop>
		<template><p>Dialog</p></template>
	</cosmoz-dialog>`)),
	stackingDialog = async () => flushDialog((await fixture(html`<div id="stackingContext">
		<cosmoz-dialog with-backdrop>
			<template><p>Dialog</p></template>
		</cosmoz-dialog>
	</div>`)).querySelector('cosmoz-dialog'));

describe('basic', () => {
	it('opens when cosmoz-dialog open() is called', async () => {
		const dialog = await basicDialog();
		setTimeout(() => dialog.open());
		await oneEvent(dialog, 'iron-overlay-opened');
		expect(dialog.paperDialog.opened).to.be.true;
		expect(dialog.paperDialog.parentElement).to.equal(document.body);
	});

	it('closes when cosmoz-dialog close() is called', async () => {
		const dialog = await basicDialog();
		setTimeout(() => dialog.open());
		await oneEvent(dialog, 'iron-overlay-opened');
		expect(dialog.paperDialog.opened).to.be.true;
		setTimeout(() => dialog.close());
		await oneEvent(dialog, 'iron-overlay-closed');
		expect(dialog.paperDialog.opened).to.be.false;
	});

	it('shows backdrop behing dialog', async () => {
		const dialog = await basicDialog();
		setTimeout(() => dialog.open());
		await oneEvent(dialog, 'iron-overlay-opened');
		await aTimeout(90);

		const dialogSize = dialog.paperDialog.getBoundingClientRect(),
			expectedDialogElement = document.elementFromPoint(dialogSize.left + 1, dialogSize.top + 1),
			expectedBackdrop = document.elementFromPoint(dialogSize.left - 1, dialogSize.top - 1);

		expect(dialog.paperDialog).to.equal(expectedDialogElement);
		expect(dialog.paperDialog.backdropElement).to.equal(expectedBackdrop);
	});

	it('shows backdrop behing dialog with stacking context', async () => {
		const dialog = await stackingDialog();
		setTimeout(() => dialog.open());
		await oneEvent(dialog, 'iron-overlay-opened');
		await aTimeout(90);

		const dialogSize = dialog.paperDialog.getBoundingClientRect(),
			expectedDialogElement = document.elementFromPoint(dialogSize.left + 1, dialogSize.top + 1),
			expectedBackdrop = document.elementFromPoint(dialogSize.left - 1, dialogSize.top - 1);

		expect(dialog.paperDialog).to.equal(expectedDialogElement);
		expect(dialog.paperDialog.backdropElement).to.equal(expectedBackdrop);
	});

});
