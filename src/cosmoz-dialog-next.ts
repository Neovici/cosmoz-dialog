import {
	component,
	html,
	ComponentOptions,
	useRef,
	useEffect,
} from '@pionjs/pion';
import { when } from 'lit-html/directives/when.js';
import styles from './styles.css';
import useDialog from './hooks/use-dialog';
import {
	DialogProps,
	DialogRef,
	DialogCloseReason,
	FooterActions,
} from './types';
import { clearIcon } from './clear-icon';
import '@neovici/cosmoz-utils/elements/cz-spinner';

export type { DialogProps };

export const renderDialog = ({
	title,
	content,
	closeable = false,
	onClose,
	dialogRef,
	host,
	defaultFooterActions = false,
	footerActions,
	loading = false,
}: {
	title: string;
	content: unknown;
	closeable: boolean;
	onClose?: (reason?: DialogCloseReason) => void;
	dialogRef: DialogRef;
	host: HTMLElement;
	defaultFooterActions?: boolean;
	footerActions?: FooterActions;
	loading?: boolean;
}) => {
	const { close } = useDialog(
		dialogRef,
		{
			closeable,
			onClose,
			open: (host as HTMLElement & DialogProps).open,
			unmovable: (host as HTMLElement & DialogProps).unmovable,
			manualFocus: (host as HTMLElement & DialogProps).manualFocus,
		},
		host,
	);

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		close('confirm');

		const form = e.target as HTMLFormElement;

		if (form) {
			const formData = new FormData(form);
			const detail = Object.fromEntries(formData.entries());
			host.dispatchEvent(
				new CustomEvent('dialog-confirm', {
					detail,
					bubbles: true,
					composed: true,
				}),
			);
		}
	};

	const handleCancel = () => {
		close('cancel');
		host.dispatchEvent(
			new CustomEvent('dialog-cancel', {
				bubbles: true,
				composed: true,
			}),
		);
	};

	const confirmText = footerActions?.confirm?.text || 'OK';
	const confirmDisabled = footerActions?.confirm?.disabled || false;
	const cancelText = footerActions?.cancel?.text || 'Cancel';
	const showCancel = !footerActions?.cancel?.hidden;

	return html`
		<style>
			${styles}
		</style>
		<dialog part="dialog">
			<form @submit=${handleSubmit} method="dialog" part="form">
				<header part="header">
					<h2 role="heading">${title}</h2>
					${when(
						closeable,
						() => html`
							<button
								type="button"
								class="close"
								aria-label="Close dialog"
								@click=${() => close('cancel')}
							>
								${clearIcon()}
							</button>
						`,
					)}
				</header>
				${when(
					loading,
					() => html`
						<div class="loading-container" part="loading">
							<cz-spinner></cz-spinner>
						</div>
					`,
					() => html`
						<main part="main">${content}</main>
						${when(
							defaultFooterActions,
							() => html`
								<footer part="footer">
									${when(
										showCancel,
										() => html`
											<button
												type="button"
												class="btn btn-secondary"
												@click=${handleCancel}
											>
												${cancelText}
											</button>
										`,
									)}
									<button
										type="submit"
										class="btn btn-primary"
										?disabled=${confirmDisabled}
									>
										${confirmText}
									</button>
								</footer>
							`,
						)}
					`,
				)}
			</form>
		</dialog>
	`;
};

type Opts<P extends object> = ComponentOptions<P>;

export const dialog = <T extends DialogProps = DialogProps>(
	renderer: (host: HTMLElement & T) => unknown,
	{ observedAttributes, ...opts }: Opts<T> = {},
) =>
	component<T>(
		(host) => {
			const dialogRef = useRef<HTMLDialogElement | null>(null);

			useEffect(() => {
				const dialogElement = host.shadowRoot?.querySelector(
					'dialog',
				) as HTMLDialogElement;
				if (dialogElement && dialogElement !== dialogRef.current) {
					dialogRef.current = dialogElement;
				}
			});

			const defaultFooterActions = host.hasAttribute('default-footer-actions')
				? true
				: host.defaultFooterActions;

			const loading = host.hasAttribute('loading') ? true : host.loading;

			return renderDialog({
				title: host.heading || host.title,
				content: renderer(host),
				closeable: host.closeable,
				onClose: host.onClose,
				dialogRef,
				host,
				defaultFooterActions,
				footerActions: host.footerActions,
				loading,
			});
		},
		{
			observedAttributes: [
				'title',
				'heading',
				'manual-focus',
				'unmovable',
				'closeable',
				'open',
				'default-footer-actions',
				'loading',
				'reason',
				...(observedAttributes ?? []),
			] as ComponentOptions<T>['observedAttributes'],
			...opts,
		},
	);

export const CosmozDialogNext = (host: HTMLElement & DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const dialogElement = host.shadowRoot?.querySelector(
			'dialog',
		) as HTMLDialogElement;
		if (dialogElement && dialogElement !== dialogRef.current) {
			dialogRef.current = dialogElement;
		}
	});

	return renderDialog({
		title: host.heading || host.title || 'Dialog',
		content: html`<slot></slot>`,
		closeable: host.closeable || false,
		onClose: host.onClose,
		dialogRef,
		host,
		defaultFooterActions: host.defaultFooterActions,
		footerActions: host.footerActions,
		loading: host.loading,
	});
};

export default component(CosmozDialogNext, {
	observedAttributes: [
		'title',
		'heading',
		'manual-focus',
		'unmovable',
		'closeable',
		'open',
		'default-footer-actions',
		'loading',
		'reason',
	],
});

export const closeAllDialogs = () => {
	window.dispatchEvent(new CustomEvent('cosmoz-dialog-next-closeall'));
};
