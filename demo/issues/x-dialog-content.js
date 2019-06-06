import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';

class XDialogContent extends PolymerElement {
	static get template() {
		return html`
			<div>
				<div><span>inProp=</span><span>[[ inProp ]]</span></div>
				<div><span>outProp=</span><span>[[ outProp ]]</span></div>
			</div>
		`;
	}

	static get is() {
		return 'x-dialog-content';
	}

	static get properties() {
		return {
			inProp: {
				type: String,
			},

			outProp: {
				type: String,
				notify: true,
				computed: '_computeOutProp(inProp)'
			}
		};
	}

	_computeOutProp(inProp) {
		return '[x-dialog-content(' + inProp + ')]';
	}
}
customElements.define(XDialogContent.is, XDialogContent);
