const connectable = (Base: typeof HTMLElement) =>
	class extends Base {
		connectedCallback() {
			// @ts-expect-error - connectedCallback exists on HTMLElement at runtime for custom elements
			super.connectedCallback?.();
			this.dispatchEvent(new CustomEvent('connected'));
		}
	};

class DialogConnectable extends connectable(HTMLElement) {
	static is = 'cosmoz-dialog-connectable';
}

customElements.define(DialogConnectable.is, DialogConnectable);
