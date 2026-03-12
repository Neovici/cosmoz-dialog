import { clearIcon } from '@neovici/cosmoz-icons';
import {
	component,
	ComponentOptions,
	html,
	useEffect,
	useMemo,
} from '@pionjs/pion';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { when } from 'lit-html/directives/when.js';
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
			const dialogRef = useMemo(() => createRef<HTMLDialogElement>(), []);

			useEffect(() => {
				const dlg = dialogRef.value;
				if (dlg && !dlg.open && dlg.isConnected) {
					dlg.showModal();
				}
			}, []);

			return html`
				<style>
					${styles}${extraStyles}
				</style>
				<dialog ${ref(dialogRef)} @close=${close}>
					${renderDialog({
						title: host.heading || host.title,
						content: renderer(host),
						closeable: host.closeable,
						onClose: close,
					})}
				</dialog>
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
			...opts,
		},
	);
