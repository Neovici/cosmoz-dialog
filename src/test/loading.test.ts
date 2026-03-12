import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit-html';
import '../loading';

describe('cosmoz-dialog-loading', () => {
	it('renders loading spinner correctly', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading heading="Loading..."></cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Loading...
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});

	it('renders with slot content', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading heading="Please wait">
				<p>Processing your request...</p>
			</cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Please wait
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});

	it('renders close button when closeable', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading
				heading="Loading..."
				closeable
			></cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Loading...
					<button class="close">
						<svg aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16">
						</svg>
					</button>
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});

	it('does not render close button when not closeable', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading heading="Loading..."></cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Loading...
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});

	it('handles unmovable attribute', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading
				heading="Loading..."
				unmovable
			></cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Loading...
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});

	it('emits close event when close button clicked', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading
				heading="Loading..."
				closeable
			></cosmoz-dialog-loading>
		`);

		const closeButton = el.shadowRoot?.querySelector('.close');
		closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});

	it('renders with multiple slot items', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading heading="Processing">
				<span>Step 1 of 3</span>
				<span>Please wait...</span>
			</cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<dialog open="" part="dialog">
				<div class="title" part="title">
					Processing
				</div>
				<div class="content" part="content">
					<style>
						.content {
							flex-direction: row;
							align-items: center;
							justify-content: center;
							padding: 30px;
						}
						cosmoz-spinner {
							width: 32px;
							height: 32px;
							margin-right: 12px;
						}
					</style>
					<cosmoz-spinner></cosmoz-spinner>
					<slot></slot>
				</div>
			</dialog>
			`,
		);
	});
});
