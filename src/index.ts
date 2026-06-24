import '@neovici/cosmoz-button';
import { xCloseIcon } from '@neovici/cosmoz-icons/untitled';

import { normalize } from '@neovici/cosmoz-tokens/normalize';
import { component, ComponentOptions, html, useRef } from '@pionjs/pion';
import { TemplateResult } from 'lit-html';
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
	subtitle,
	icon,
	content,
	closeable = false,
	onClose,
}: {
	title: string;
	subtitle?: string;
	icon?: TemplateResult;
	content: unknown;
	closeable: boolean;
	onClose: () => void;
}) => {
	return html`
		<div class="title" part="title">
			${when(icon, () => html`<div class="settings">${icon}</div>`)}

			<div>
				<h2>${title}</h2>
				${when(subtitle, () => html`<p class="subtitle">${subtitle}</p>`)}
			</div>

			${when(
				closeable,
				() => html`
					<cosmoz-button
						variant="tertiary"
						size="sm"
						class="close"
						part="close"
						@click=${onClose}
					>
						${xCloseIcon({ width: '20', height: '20' })}
					</cosmoz-button>
				`,
			)}
		</div>

		<div class="divider"></div>
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
					@connected=${(e: Event) => {
						const dlg = (e.target as HTMLElement).querySelector('dialog');
						if (dlg && !dlg.open) dlg.showModal();
					}}
				>
					<dialog ${ref(dialogRef)} @close=${close} part="dialog">
						${renderDialog({
							title: host.heading || host.title,
							subtitle: host.subtitle,
							icon: host.icon,
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
				'subtitle',
				'icon',
				'heading',
				'unmovable',
				'closeable',
				...(observedAttributes ?? []),
			] as ComponentOptions<T>['observedAttributes'],
			styleSheets: [normalize, styles],
			...opts,
		},
	);
