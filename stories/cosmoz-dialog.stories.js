import { building05Icon, trash01Icon } from '@neovici/cosmoz-icons/untitled';
import { html } from 'lit-html';
import { dialog } from '../src/index';
import '../src/loading';
customElements.define(
	'demo-dialog',
	dialog(() => html`<p>Dialog content goes here</p>`),
);

const Dialog = ({ heading, subtitle, icon, closeable, unmovable }) => html`
	<demo-dialog
		.heading=${heading}
		.subtitle=${subtitle}
		.icon=${icon}
		?closeable=${closeable}
		?unmovable=${unmovable}
	></demo-dialog>
`;

export default {
	title: 'Dialog',
	subtitle: 'A simple dialog component',
	render: Dialog,
	argTypes: {
		heading: {
			control: 'text',
			description: 'The title displayed at the top of the dialog',
		},
		subtitle: {
			control: 'text',
			description: 'The subtitle displayed below the title',
		},

		icon: {
			control: false,
			description: 'A TemplateResult to render as the dialog icon',
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
		heading: 'Blog post published',
		subtitle:
			'This blog post has been published. Team members will be able to edit this post and republish changes.',
		icon: null,
		closeable: true,
		unmovable: false,
	},
};

export const WithIcon = {
	args: {
		heading: 'Add your company',
		subtitle: 'Create your company profile for free in less than 5 minutes.',
		icon: building05Icon(),
		closeable: true,
		unmovable: false,
	},
};
export const WithCustomIcon = {
	args: {
		heading: 'Add your company',
		subtitle: 'Create your company profile for free in less than 5 minutes.',
		icon: trash01Icon({ styles: 'color:var(--cz-color-text-error)' }),
		closeable: true,
		unmovable: false,
	},
};

export const Loading = {
	render: () => html`
		<cosmoz-dialog-loading heading="Loading" subtitle="Please wait..."
			>Please wait while we process your request.</cosmoz-dialog-loading
		>
	`,
};
