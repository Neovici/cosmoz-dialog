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
      <dialog open="" part="dialog">
        <div class="title" part="title">
          Test Dialog
          <button class="close">
            <svg aria-hidden="true" focusable="false" height="16" viewBox="0 0 16 16" width="16">
            </svg>
          </button>
        </div>
        <div class="content" part="content">
          <p>Test dialog content</p>
        </div>
      </dialog>
      `,
		);
	});

	it('renders correctly without closeable button', async () => {
		const el = await fixture(html`
			<test-dialog heading="Dialog Without Close Button"></test-dialog>
		`);

		assert.shadowDom.equal(
			el,
			`
      <dialog open="" part="dialog">
        <div class="title" part="title">
          Dialog Without Close Button
        </div>
        <div class="content" part="content">
          <p>Test dialog content</p>
        </div>
      </dialog>
      `,
		);
	});
});
