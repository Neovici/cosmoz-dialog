import { tagged as css } from '@neovici/cosmoz-utils';

export default css`
	dialog[open] {
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 550px;
		max-width: 98vw;
		max-height: 96vh;

		padding: 20px 24px;

		border-radius: 10px;
		border: none;
		background-color: var(--cosmoz-dialog-background-color, #fff);
		overflow: visible;
		box-shadow:
			0 2px 25px -5px black,
			0 8px 10px -6px black;
	}

	dialog[open][data-size='fullscreen'] {
		padding: 0;
	}

	dialog[data-backdrop]::backdrop {
		background-color: rgba(0, 0, 0, 0.6);
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.6);
	}

	:host([backdrop]) dialog::after {
		content: '';
		display: block;
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		pointer-events: none;
		box-shadow:
			0 16px 24px 2px #00000024,
			0 6px 30px 5px #0000001f,
			0 8px 10px -5px #0006;
	}

	.title {
		display: flex;
		padding: var(--dialog-title-padding, 22px 24px);
		padding-bottom: 0;
		color: var(--dialog-title-color, #000);
		background-color: var(--dialog-title-background-color, #fff);
		font-size: var(--dialog-title-font-size, 20px);
		font-weight: var(--dialog-title-font-weight, 400);
		line-height: 1.4;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	:host(:not([unmovable])) .title {
		cursor: move;
		user-select: none;
	}

	.content {
		background: var(--cosmoz-dialog-background-color, #fff);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	.close {
		display: inline-block;
		height: 24px;
		padding: 0;
		position: absolute;
		right: 24px;
		top: 22px;
		background-color: transparent;
		margin: 0;
		min-width: unset;
		min-height: unset;
		border: unset;
		cursor: pointer;
	}

	form {
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		flex-shrink: 0;
		position: relative;
	}

	main {
		padding: 1rem;
		overflow-y: auto;
		flex: 1;
	}

	footer {
		padding: 1rem;
		text-align: right;
		flex-shrink: 0;
	}

	.btn {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		margin-left: 0.5rem;
	}

	.btn:first-child {
		margin-left: 0;
	}

	.btn-primary {
		background-color: #007bff;
		color: white;
	}

	.btn-secondary {
		background-color: #6c757d;
		color: white;
	}

	h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		min-height: 100px;
		flex: 1;
	}

	.loading-container cz-spinner {
		width: 32px;
		height: 32px;
	}

	::slotted([dialog-confirm]) {
		background-color: #007bff;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		margin-left: 0.5rem;
	}

	::slotted([dialog-dismiss]) {
		background-color: #6c757d;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		margin-left: 0.5rem;
	}

	/* Styles for buttons container */
	::slotted(.buttons) {
		padding: 1rem;
		text-align: right;
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}
`;
