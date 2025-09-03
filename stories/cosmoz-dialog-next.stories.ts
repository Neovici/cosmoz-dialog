import { html } from 'lit-html';
import { when } from 'lit-html/directives/when.js';
import { component } from '@pionjs/pion';
import { dialog, type DialogProps, CosmozDialogNext } from '../src/index';

interface DemoProps extends DialogProps {
	content?: string;
	showExtraContent?: boolean;
}

const DemoDialog = dialog<DemoProps>(
	(host) => {
		return html`
			<div style="padding: 1rem;">
				<p>${host.content || 'This is the dialog content!'}</p>
				${when(
					host.showExtraContent,
					() => html`
						<div>
							<h3>Additional Content</h3>
							<p>
								This is some additional content that can be shown in the dialog.
							</p>
						</div>
					`,
				)}
			</div>
		`;
	},
	{
		observedAttributes: ['content', 'show-extra-content'],
	},
);

customElements.define('demo-dialog', DemoDialog);
customElements.define('cosmoz-dialog-next', CosmozDialogNext);

const SimpleDialog = component((host: HTMLElement & { content?: string }) => {
	return html`
		<cosmoz-dialog-next
			title="Simple Dialog"
			?open=${host.hasAttribute('open')}
			?closeable=${host.hasAttribute('closeable')}
			?default-footer-actions=${host.hasAttribute('default-footer-actions')}
			?footer-actions=${host.hasAttribute('footer-actions')}
		>
			<div style="padding: 1rem;">
				<p>${host.content || 'This is a simple dialog example.'}</p>
			</div>
		</cosmoz-dialog-next>
	`;
});

customElements.define('simple-dialog', SimpleDialog);

export default {
	title: 'Components/CosmozDialogNext',
	component: 'demo-dialog',
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Dialog title',
		},
		content: {
			control: 'text',
			description: 'Dialog content text',
		},
		open: {
			control: 'boolean',
			description: 'Whether the dialog is open',
		},
		closeable: {
			control: 'boolean',
			description: 'Whether the dialog can be closed',
		},
		defaultFooterActions: {
			control: 'boolean',
			description: 'Show default OK/Cancel buttons',
		},
		loading: {
			control: 'boolean',
			description: 'Show loading spinner',
		},
		unmovable: {
			control: 'boolean',
			description: 'Disable drag functionality',
		},
		showExtraContent: {
			control: 'boolean',
			description: 'Show additional content in dialog',
		},
		footerActions: {
			control: 'object',
			description: 'Custom footer action configuration',
		},
	},
};

type TemplateArgs = {
	title?: string;
	content?: string;
	open?: boolean;
	closeable?: boolean;
	defaultFooterActions?: boolean;
	loading?: boolean;
	unmovable?: boolean;
	showExtraContent?: boolean;
	footerActions?: {
		confirm?: {
			text: string;
			disabled?: boolean;
		};
		cancel?: {
			text: string;
			hidden?: boolean;
		};
	};
};

const Template = (args: TemplateArgs, context: { id?: string } = {}) => {
	const storyId = context?.id || 'default';
	const dialogId = `demo-dialog-${storyId.replace(/[^a-zA-Z0-9]/gu, '-')}`;

	const handleDialogConfirm = (e: CustomEvent) => {
		// eslint-disable-next-line no-console
		console.log('Dialog confirmed:', e.detail);
	};

	const handleDialogCancel = () => {
		// eslint-disable-next-line no-console
		console.log('Dialog cancelled');
	};

	return html`
		<div style="height: 400px; position: relative;">
			<p>Click the button below to open the dialog:</p>
			<button
				@click=${() => {
					const dialog = document.querySelector(
						`#${dialogId}`,
					) as HTMLElement & {
						setAttribute: (name: string, value: string) => void;
					};
					if (dialog) {
						dialog.setAttribute('open', '');
					}
				}}
			>
				Open Dialog
			</button>

			<demo-dialog
				id=${dialogId}
				.title=${args.title || 'Sample Dialog'}
				.content=${args.content || 'This is the dialog content!'}
				?open=${args.open}
				?closeable=${args.closeable}
				?default-footer-actions=${args.defaultFooterActions}
				?loading=${args.loading}
				?unmovable=${args.unmovable}
				.showExtraContent=${args.showExtraContent}
				.footerActions=${args.footerActions}
				@dialog-confirm=${handleDialogConfirm}
				@dialog-cancel=${handleDialogCancel}
			></demo-dialog>
		</div>
	`;
};

type StoryType = typeof Template & { args?: TemplateArgs };

export const Default: StoryType = Template.bind({});
Default.args = {
	title: 'Default Dialog',
	content: 'This is the default dialog example with basic functionality.',
	closeable: true,
};

export const WithFooterActions: StoryType = Template.bind({});
WithFooterActions.args = {
	title: 'Dialog with Footer Actions',
	content:
		'This dialog demonstrates the default footer actions with OK and Cancel buttons. Click OK to confirm or Cancel to dismiss.',
	closeable: true,
	defaultFooterActions: true,
	footerActions: {
		confirm: {
			text: 'Submit',
		},
		cancel: {
			text: 'Go Back',
		},
	},
};

export const Loading: StoryType = Template.bind({});
Loading.args = {
	title: 'Loading Dialog',
	content: 'This dialog shows a loading state with a spinner.',
	loading: true,
};

export const NonCloseable: StoryType = Template.bind({});
NonCloseable.args = {
	title: 'Non-Closeable Dialog',
	content:
		'This dialog cannot be closed by clicking outside or pressing Escape. You must use the footer buttons to close it.',
	closeable: false,
	defaultFooterActions: true,
};

export const Unmovable: StoryType = Template.bind({});
Unmovable.args = {
	title: 'Unmovable Dialog',
	content:
		"This dialog cannot be dragged around. Try clicking and dragging the title bar - it won't move!",
	closeable: true,
	unmovable: true,
};

export const WithExtraContent: StoryType = Template.bind({});
WithExtraContent.args = {
	title: 'Dialog with Extra Content',
	content:
		'This dialog has additional content sections that are conditionally rendered.',
	closeable: true,
	defaultFooterActions: true,
	showExtraContent: true,
};
