import '@neovici/cosmoz-spinner';
import { html } from 'lit-html';
import { dialog } from '.';

customElements.define(
	'cosmoz-dialog-loading',
	dialog(
		() => html`
			<style>
				.content {
					flex-direction: row;
					align-items: center;
					justify-content: center;
					padding: calc(var(--cz-spacing) * 8) calc(var(--cz-spacing) * 6);
				}
				cosmoz-spinner {
					width: 32px;
					height: 32px;
					margin-right: calc(var(--cz-spacing) * 3);
				}
			</style>
			<cosmoz-spinner></cosmoz-spinner>
			<slot></slot>
		`,
	),
);
