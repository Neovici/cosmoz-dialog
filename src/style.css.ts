import { css } from '@pionjs/pion';

const sp = (n: number) => `calc(var(--cz-spacing) * ${n})`;

export default css`
	dialog:not([open]) {
		display: none;
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

	.title {
		display: flex;
		align-items: center;
		gap: ${sp(4)};
		padding: ${sp(6)} ${sp(6)};

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
		padding: ${sp(6)};
		color: var(--cz-color-text-primary);
		font-size: var(--cz-text-base);
		font-weight: var(--cz-font-weight-regular);
		line-height: var(--cz-text-base-line-height);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(var(--cz-spacing) * 10);
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
`;
