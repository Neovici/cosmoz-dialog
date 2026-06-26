import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit-html';
import { dialog } from '../index';

const TestDialog = dialog(() => html`<p>Test dialog content</p>`);
customElements.define('test-dialog', TestDialog);

describe('dialog', () => {
	it('renders correctly with basic props', async () => {
		const el = await fixture(html`
			<test-dialog heading="Test Dialog" closeable></test-dialog>
		`);

		assert.shadowDom.equal(
			el,
			`
      <cosmoz-dialog-connectable>
        <dialog open="" part="dialog">
          <div class="title" part="title">
            <div>
              <h2>Test Dialog</h2>
            </div>
            <cosmoz-button class="close" part="close" size="sm" variant="tertiary">
            </cosmoz-button>
          </div>
          <div class="divider"></div>
          <div class="content" part="content">
            <div class="body">
              <p>Test dialog content</p>
            </div>
          </div>
        </dialog>
      </cosmoz-dialog-connectable>
      `
		);
	});

	it('renders correctly without closeable button', async () => {
		const el = await fixture(html`
			<test-dialog heading="Dialog Without Close Button"></test-dialog>
		`);

		assert.shadowDom.equal(
			el,
			`
      <cosmoz-dialog-connectable>
        <dialog open="" part="dialog">
          <div class="title" part="title">
            <div>
              <h2>Dialog Without Close Button</h2>
            </div>
          </div>
          <div class="divider"></div>
          <div class="content" part="content">
            <div class="body">
              <p>Test dialog content</p>
            </div>
          </div>
        </dialog>
      </cosmoz-dialog-connectable>
      `
		);
	});
});
