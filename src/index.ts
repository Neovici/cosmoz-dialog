import '@neovici/cosmoz-button';
import { xCloseIcon } from '@neovici/cosmoz-icons/untitled';

import { normalize } from '@neovici/cosmoz-tokens/normalize';
import {
	component,
	ComponentOptions,
	html,
	useEffect,
	useRef,
} from '@pionjs/pion';
import { t } from 'i18next';
import { TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ref } from 'lit-html/directives/ref.js';
import { when } from 'lit-html/directives/when.js';
import './connectable.js';
import { deepActiveElement, firstTabbable } from './focus';
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
	heading,
	subtitle,
	icon,
	content,
	closeable = false,
	onClose,
}: {
	heading: string;
	subtitle?: string;
	icon?: TemplateResult;
	content: unknown;
	closeable: boolean;
	onClose: () => void;
}) => {
	return html`
		<div class="title" part="title">
			${when(icon, () => html`<div class="icon">${icon}</div>`)}

			<div>
				<h2 id="heading">${heading}</h2>
				${when(
					subtitle,
					() => html`<p id="subtitle" class="subtitle">${subtitle}</p>`
				)}
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
						<span class="visually-hidden">${t('Close')}</span>
					</cosmoz-button>
				`
			)}
		</div>

		<div class="divider"></div>
		<div class="content" part="content">
			<div class="body">${content}</div>
		</div>
	`;
};

type Opts<P extends object> = ComponentOptions<P> & { styles?: unknown };

export const dialog = <T extends Props = Props>(
	renderer: (host: HTMLElement & T) => unknown,
	{ observedAttributes, styles: extraStyles, ...opts }: Opts<T> = {}
) =>
	component<T>(
		(host) => {
			const { close } = useClose();
			useMove();
			const dialogRef = useRef<HTMLDialogElement>();
			const returnTo = useRef<HTMLElement | null>(null);

			// Removing an open dialog, unlike closing it, doesn't return focus.
			useEffect(
				() => () => {
					const to = returnTo.current;
					queueMicrotask(() => {
						const active = deepActiveElement();
						if (to?.isConnected && (!active || active === document.body)) {
							to.focus();
						}
					});
				},
				[]
			);

			return html`
				${when(
					extraStyles,
					() =>
						html`<style>
							${extraStyles}
						</style>`
				)}
				<cosmoz-dialog-connectable
					@connected=${(e: Event) => {
						const dlg = (e.target as HTMLElement).querySelector('dialog');
						if (!dlg || dlg.open) return;
						returnTo.current = deepActiveElement();
						dlg.showModal();
						// showModal() only sees what has rendered so far.
						requestAnimationFrame(() => {
							const content = dlg.querySelector('.content')!;
							(
								content.querySelector<HTMLElement>('[autofocus]') ??
								firstTabbable(content)
							)?.focus();
						});
					}}
				>
					<dialog
						${ref(dialogRef)}
						part="dialog"
						role=${ifDefined(host.alert ? 'alertdialog' : undefined)}
						aria-labelledby="heading"
						aria-describedby=${ifDefined(
							host.subtitle ? 'subtitle' : undefined
						)}
						@close=${close}
						@cancel=${(e: Event) => host.uncancelable && e.preventDefault()}
						@keydown=${(e: KeyboardEvent) =>
							e.key === 'Escape' && host.uncancelable && e.preventDefault()}
					>
						${renderDialog({
							heading: host.heading,
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
				'subtitle',
				'icon',
				'heading',
				'unmovable',
				'closeable',
				'uncancelable',
				'alert',
				...(observedAttributes ?? []),
			] as ComponentOptions<T>['observedAttributes'],
			styleSheets: [normalize, styles],
			...opts,
		}
	);
