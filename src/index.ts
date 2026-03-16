import { clearIcon } from '@neovici/cosmoz-icons';
import { component, ComponentOptions, html, useRef } from '@pionjs/pion';
import { ref } from 'lit-html/directives/ref.js';
import { when } from 'lit-html/directives/when.js';
import './connectable.js';
import styles from './style.css';
import { Props } from './types';
import useClose from './use-close';
import useMove from './use-move';

export type { Props };

export const useDialog = () => {
	useClose();
	useMove();
};

export const renderDialog = ({
	title,
	content,
	closeable = false,
	onClose,
}: {
	title: string;
	content: unknown;
	closeable: boolean;
	onClose: () => void;
}) => {
	return html`
		<div class="title" part="title">
			${title}
			${when(
				closeable,
				() => html`
					<button class="close" @click=${onClose}>${clearIcon()}</button>
				`,
			)}
		</div>
		<div class="content" part="content">${content}</div>
	`;
};

type Opts<P extends object> = ComponentOptions<P> & { styles?: unknown };

export const dialog = <T extends Props = Props>(
	renderer: (host: HTMLElement & T) => unknown,
	{ observedAttributes, styles: extraStyles, ...opts }: Opts<T> = {},
) =>
	component<T>(
		(host) => {
			const { close } = useClose();
			useMove();
			const dialogRef = useRef<HTMLDialogElement>();

			return html`
				${when(
					extraStyles,
					() =>
						html`<style>
							${extraStyles}
						</style>`,
				)}
				<cosmoz-dialog-connectable
					@connected=${() => {
						const dlg = dialogRef.current;
						if (dlg && !dlg.open) dlg.showModal();
					}}
				>
					<dialog ${ref(dialogRef)} @close=${close} part="dialog">
						${renderDialog({
							title: host.heading || host.title,
							content: renderer(host),
							closeable: host.closeable,
							onClose: close,
						})}
					</dialog>
				</cosmoz-dialog-connectable>
			`;
		},
		{
			observedAttributes: [
				'title',
				'heading',
				'unmovable',
				'closeable',
				...(observedAttributes ?? []),
			] as ComponentOptions<T>['observedAttributes'],
			styleSheets: [styles],
			...opts,
		},
	);
