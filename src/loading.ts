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
					gap: calc(var(--cz-spacing) * 3);
				}
				cosmoz-spinner {
					width: 32px;
					height: 32px;
				}
			</style>
			<cosmoz-spinner></cosmoz-spinner>
			<slot></slot>
		`
	)
);
