import { PolymerElement } from '@polymer/polymer/polymer-element';

import { CosmozDialogMixin } from './cosmoz-dialog-mixin';

/**
 * `<cosmoz-dialog>` is a wrapper element for `<paper-dialog>`, but that will append a paper-dialog to a `<cosmoz-dialog-container>`
 * container element or to the `<body>` element if no container is available.
 *
 * This is an attempt to workaround stacking context issues with dialogs.
 * Inspired by https://github.com/PolymerLabs/iron-overlay.
 *
 * Content of the `<paper-dialog>` must be specified in a `<template>` element.
 *
 * @demo demo/index.html Dialog Demo
 * @appliesMixin CosmozDialogMixin
 */
class CosmozDialog extends CosmozDialogMixin(PolymerElement) {
	static get is() {
		return 'cosmoz-dialog';
	}
}

customElements.define(CosmozDialog.is, CosmozDialog);
