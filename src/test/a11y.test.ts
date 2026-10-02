import { assert, fixture, nextFrame, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { init } from 'i18next';
import { html, render, TemplateResult } from 'lit-html';
import { deepActiveElement as focused } from '../focus';
import { dialog } from '../index';

init({ lng: 'en', resources: {} });

// Dialog contract (Base UI Dialog/AlertDialog): named by its heading, focus
// moves into it on open and back to where it was on close, Escape closes it
// unless uncancelable or already handled inside.

customElements.define(
	'shadow-field',
	class extends HTMLElement {
		// Renders after connecting and delegates focus, like cosmoz-input.
		connectedCallback() {
			queueMicrotask(() => {
				this.attachShadow({ mode: 'open', delegatesFocus: true }).innerHTML =
					'<input disabled id="off" /><input id="on" />';
			});
		}
	}
);
customElements.define(
	'a11y-dialog',
	dialog(
		() => html`<p>Text</p>
			<shadow-field></shadow-field>
			<button>Later</button>`
	)
);
customElements.define(
	'a11y-dialog-autofocus',
	dialog(() => html`<input /><cosmoz-button autofocus>Pick me</cosmoz-button>`)
);
customElements.define(
	'a11y-dialog-buttons',
	dialog(() => html`<button>First</button><button id="second">Second</button>`)
);
customElements.define(
	'a11y-dialog-empty',
	dialog(() => html`<p>Nothing to focus</p>`)
);

const setup = async (
	tpl: (onClose: () => void) => TemplateResult = (onClose) =>
		html`<a11y-dialog heading="Edit" .onClose=${onClose}></a11y-dialog>`
) => {
	const host = await fixture(
		html`<div>
			<button id="trigger">Open</button>
			<div></div>
		</div>`
	);
	const trigger = host.querySelector<HTMLButtonElement>('#trigger')!;
	const slot = host.querySelector('div')!;
	let closed = 0;
	trigger.focus();
	render(
		tpl(() => closed++),
		slot
	);
	const el = slot.firstElementChild as HTMLElement;
	const dlg = () => el.shadowRoot!.querySelector('dialog')!;
	await waitUntil(() => el.shadowRoot?.querySelector('dialog')?.open);
	await nextFrame();
	await nextFrame();
	return { el, dlg, trigger, slot, closed: () => closed };
};

describe('dialog a11y', () => {
	it('is named by its heading and described by its subtitle', async () => {
		const { dlg } = await setup(
			() =>
				html`<a11y-dialog
					heading="Edit user"
					subtitle="Changes apply now"
					closeable
				></a11y-dialog>`
		);
		const root = dlg().getRootNode() as ShadowRoot;
		assert.equal(dlg().getAttribute('aria-labelledby'), 'heading');
		assert.equal(root.getElementById('heading')!.textContent, 'Edit user');
		assert.equal(dlg().getAttribute('aria-describedby'), 'subtitle');
		assert.equal(
			root.getElementById('subtitle')!.textContent,
			'Changes apply now'
		);

		const close = root.querySelector('.close')!;
		assert.equal(
			close.textContent!.trim(),
			'Close',
			'the icon button has a name'
		);
		assert.isAtMost(
			close.querySelector('.visually-hidden')!.getBoundingClientRect().width,
			1
		);
	});

	it('focuses the first field, inside a component that delegates focus', async () => {
		const { el } = await setup();
		await waitUntil(() => focused()?.id === 'on');
		assert.equal(
			focused(),
			el
				.shadowRoot!.querySelector('shadow-field')!
				.shadowRoot!.querySelector('#on')
		);
	});

	it('focuses an autofocus element instead, even one that delegates focus', async () => {
		const { el } = await setup(
			() => html`<a11y-dialog-autofocus heading="Pick"></a11y-dialog-autofocus>`
		);
		await waitUntil(() => focused()?.tagName === 'BUTTON');
		assert.equal(
			(focused()!.getRootNode() as ShadowRoot).host,
			el.shadowRoot!.querySelector('cosmoz-button[autofocus]')
		);
	});

	it('starts on the content, not the close button', async () => {
		await setup(
			() =>
				html`<a11y-dialog-buttons
					heading="Pick"
					closeable
				></a11y-dialog-buttons>`
		);
		assert.equal(focused()?.textContent, 'First');
	});

	it('focuses the dialog itself when there is nothing to tab to', async () => {
		const { dlg } = await setup(
			() => html`<a11y-dialog-empty heading="Info"></a11y-dialog-empty>`
		);
		assert.equal(focused(), dlg());
	});

	it('returns focus to the trigger when removed', async () => {
		const { slot, trigger } = await setup();
		render(html``, slot);
		await nextFrame();
		assert.equal(focused(), trigger);
	});

	it('closes on Escape and returns focus', async () => {
		const { closed, trigger } = await setup();
		await sendKeys({ press: 'Escape' });
		await waitUntil(() => closed() === 1);
		assert.equal(focused(), trigger);
	});

	it('ignores Escape when uncancelable', async () => {
		const { dlg, closed } = await setup(
			(onClose) =>
				html`<a11y-dialog
					heading="Busy"
					uncancelable
					.onClose=${onClose}
				></a11y-dialog>`
		);
		await sendKeys({ press: 'Escape' });
		await sendKeys({ press: 'Escape' });
		await nextFrame();
		assert.isTrue(dlg().open);
		assert.equal(closed(), 0);
	});

	it('stays open when a control inside handled Escape', async () => {
		const { el, dlg, closed } = await setup();
		el.shadowRoot!.querySelector('shadow-field')!.addEventListener(
			'keydown',
			(e: Event) => (e as KeyboardEvent).key === 'Escape' && e.preventDefault()
		);
		await sendKeys({ press: 'Escape' });
		await nextFrame();
		assert.isTrue(dlg().open);
		assert.equal(closed(), 0);
	});

	it('renders as an alertdialog when alert is set', async () => {
		const { dlg } = await setup(
			() => html`<a11y-dialog heading="Delete?" alert></a11y-dialog>`
		);
		assert.equal(dlg().getAttribute('role'), 'alertdialog');
	});
});
