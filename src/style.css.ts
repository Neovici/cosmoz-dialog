import { css } from '@pionjs/pion';

const sp = (n: number) => `calc(var(--cz-spacing) * ${n})`;

export const narrow = '(max-width: 639px)';

export default css`
	dialog:not([open]) {
		display: none;
	}

	:host {
		--cz-scrollbar-width: calc(var(--cz-spacing) * 2);
		--cz-padding-block: ${sp(4)};
		--cz-padding-inline: ${sp(4)};
		@media screen and (min-width: 640px) {
			--cz-padding-block: ${sp(8)};
			--cz-padding-inline: ${sp(8)};
		}
	}

	dialog {
		position: relative;
		margin: auto;
		padding: 0;
		border: none;
		width: 550px;
		max-width: 98vw;
		max-height: 96vh;
		border-radius: var(--cz-radius-2xl);
		display: flex;
		flex-direction: column;
		background: var(--cz-color-bg-secondary);
		box-shadow: var(--cz-shadow-2xl);
		outline: none;
	}

	dialog::backdrop {
		background: color-mix(in srgb, var(--cz-color-bg-overlay) 70%, transparent);
	}

	@media ${narrow} {
		:host([sheet]) dialog {
			margin: auto 0 0;
			width: 100%;
			max-width: 100%;
			max-height: calc(100dvh - ${sp(8)});
			border-radius: var(--cz-radius-3xl) var(--cz-radius-3xl) 0 0;
			padding-bottom: env(safe-area-inset-bottom);
		}

		:host([sheet]) dialog[open] {
			animation: sheet-in 200ms ease-out;
		}

		:host([sheet]:not([unmovable])) .title {
			cursor: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:host([sheet]) dialog[open] {
			animation: none;
		}
	}

	@keyframes sheet-in {
		from {
			transform: translateY(100%);
		}
	}

	.title {
		display: flex;
		align-items: center;
		gap: ${sp(4)};
		padding: var(--cz-padding-block)
			calc(var(--cz-padding-inline) + var(--cz-scrollbar-width));

		& h2 {
			color: var(--cz-color-text-primary);
			font-size: var(--cz-text-lg);
			font-weight: var(--cz-font-weight-semibold);
			line-height: var(--cz-text-lg-line-height);
		}

		& .subtitle {
			font-size: var(--cz-text-sm);
			font-weight: var(--cz-font-weight-regular);
			line-height: var(--cz-text-sm-line-height);
			color: var(--cz-color-text-secondary);
		}
	}

	.divider {
		height: 1px;
		background: var(--cz-color-border-primary);
	}

	:host(:not([unmovable])) .title {
		cursor: move;
		user-select: none;
	}

	.content {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		color: var(--cz-color-text-primary);
		font-size: var(--cz-text-base);
		font-weight: var(--cz-font-weight-regular);
		line-height: var(--cz-text-base-line-height);
	}

	.body {
		padding: var(--cz-padding-block)
			calc(var(--cz-padding-inline) + var(--cz-scrollbar-width));
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
	}

	.body > * {
		overflow-y: auto;
		padding-right: var(--cz-scrollbar-width);
		flex: 1 1 auto;
		min-height: 0;
	}

	.body > :last-child:not(:first-child) {
		flex: 0 0 auto;
		overflow-y: visible;
		padding-right: 0;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--cz-spacing) * 10);
		min-width: calc(var(--cz-spacing) * 10);
		height: calc(var(--cz-spacing) * 10);
		background: var(--cz-color-bg-secondary);
		border: 1px solid var(--cz-color-border-primary);
		border-radius: var(--cz-radius-md);
		color: var(--cz-color-text-secondary);
		box-shadow: var(--cz-shadow-sm);

		& svg {
			width: calc(var(--cz-spacing) * 5);
			height: calc(var(--cz-spacing) * 5);
		}
	}

	.close {
		position: absolute;
		top: ${sp(4)};
		right: ${sp(4)};
	}

	/* Width of the entire scroll bar */
	::-webkit-scrollbar {
		width: var(--cz-scrollbar-width);
	}

	/* Background/track of the scroll bar */
	::-webkit-scrollbar-track {
		background: var(--cz-color-border-primary);
	}

	/* The draggable scroll handle/thumb */
	::-webkit-scrollbar-thumb {
		background: var(--cz-color-fg-quaternary-hover);
		border-radius: var(--cz-radius-2xl);
	}

	/* The handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: var(--cz-color-fg-quaternary);
	}
`;
