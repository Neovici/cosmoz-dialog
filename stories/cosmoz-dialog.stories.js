import { html } from 'lit-html';
import { dialog } from '../src/index';

customElements.define(
	'demo-dialog',
	dialog(() => html`<p>Dialog content goes here</p>`),
);

const Dialog = ({ heading, closeable, unmovable }) => html`
	<demo-dialog
		.heading=${heading}
		?closeable=${closeable}
		?unmovable=${unmovable}
	></demo-dialog>
`;

export default {
	title: 'Dialog',
	render: Dialog,
	argTypes: {
		heading: {
			control: 'text',
			description: 'The title displayed at the top of the dialog',
		},
		closeable: {
			control: 'boolean',
			description: 'Shows a close button in the title bar',
		},
		unmovable: {
			control: 'boolean',
			description: 'Prevents the dialog from being dragged',
		},
	},
};

export const Basic = {
	args: {
		heading: 'Dialog Title',
		closeable: true,
		unmovable: false,
	},
};
