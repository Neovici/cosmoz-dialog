import '@polymer/paper-button';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';

import './x-dialog-content.js';
import '../../cosmoz-dialog.js';

class XDialogContainer extends PolymerElement {
	static get template() {
		return html`
			<paper-button raised on-click="openDialog">Open</paper-button>
			<div>containerProp=<span>[[containerProp]]</span></div>
			<div>dialogOutProp=<span>[[dialogOutProp]]</span></div>
			<cosmoz-dialog with-backdrop id="xDialog" prerender>
				<template>
					<h2>Dialog Title</h2>
					<p>
						<x-dialog-content in-prop="{{ containerProp }}" out-prop="{{dialogOutProp}}"></x-dialog-content>
					</p>
					<div class="buttons">
						<paper-button dialog-dismiss>Cancel</paper-button>
						<paper-button dialog-confirm>Accept</paper-button>
					</div>
				</template>
			</cosmoz-dialog>
		`;
	}

	static get is() {
		return 'x-dialog-container';
	}

	static get properties() {
		return {
			containerProp: {
				type: String
			},
			dialogOutProp: {
				type: String
			}
		};
	}

	openDialog() {
		this.$.xDialog.open();
	}
}
customElements.define(XDialogContainer.is, XDialogContainer);
