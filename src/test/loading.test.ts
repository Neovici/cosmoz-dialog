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
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Loading...</h2>
						</div>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
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
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Please wait</h2>
						</div>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
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
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Loading...</h2>
						</div>
						<cosmoz-button class="close" part="close" size="sm" variant="tertiary">
						</cosmoz-button>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
		);
	});

	it('does not render close button when not closeable', async () => {
		const el = await fixture(html`
			<cosmoz-dialog-loading heading="Loading..."></cosmoz-dialog-loading>
		`);

		assert.shadowDom.equal(
			el,
			`
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Loading...</h2>
						</div>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
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
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Loading...</h2>
						</div>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
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
			<cosmoz-dialog-connectable>
				<dialog open="" part="dialog">
					<div class="title" part="title">
						<div>
							<h2>Processing</h2>
						</div>
					</div>
					<div class="divider"></div>
					<div class="content" part="content">
						<div class="body">
							<cosmoz-spinner></cosmoz-spinner>
							<slot></slot>
						</div>
					</div>
				</dialog>
			</cosmoz-dialog-connectable>
			`
		);
	});
});
