import '@polymer/iron-form';

import { html } from '@polymer/polymer/lib/utils/html-tag';
import { PolymerElement } from '@polymer/polymer/polymer-element';

import { dialogOpener } from './cosmoz-dialog-mixin';

/**
 * `<cosmoz-form-dialog>`
 * @demo demo/form-dialog.html Dialog Demo
 * @appliesMixin dialogOpener
 */
class CosmozFormDialog extends dialogOpener(PolymerElement) {
	static get is() {
		return 'cosmoz-form-dialog';
	}

	constructor() {
		super();
		this._form = null;
		this._spawnSteps.push(this._createForm);
	}

	static get template() {
		return html`
			<template>
				<div hidden>
					<slot></slot>
				</div>
			</template>
		`;
	}

	get form() {
		return this._form;
	}

	_detachDialog() {
		if (this._form != null && this._form.parentNode) {
			this._form.parentNode.removeChild(this._form);
		}
	}

	_attachDialog() {
		if (!this._form.parentNode) {
			document.body.appendChild(this._form);
		}
	}

	_createForm() {
		if (!this._paperDialog) {
			return;
		}
		const ironForm = document.createElement('iron-form'),
			form = document.createElement('form');

		ironForm.appendChild(form);
		form.appendChild(this._paperDialog);
		this._form = ironForm;
	}
}
customElements.define(CosmozFormDialog.is, CosmozFormDialog);
