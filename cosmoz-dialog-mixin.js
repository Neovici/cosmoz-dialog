import '@polymer/paper-dialog';

import { microTask } from '@polymer/polymer/lib/utils/async';
import { templatize } from '@polymer/polymer/lib/utils/templatize';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';

import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';

/**
 * @polymer
 * @mixinFunction
 */
export const dialogOpener = dedupingMixin(base => // eslint-disable-line max-lines-per-function
	class extends base {
		static get properties() {
			return {
				/**
				 *	Set to true to display a backdrop behind the overlay
				 */
				withBackdrop: {
					type: Boolean,
					value: true
				},

				/**
				 * Set to true to disable auto-focusing the overlay or child nodes with
				 * the `autofocus` attribute` when the overlay is opened.
				 */
				noAutoFocus: {
					type: Boolean,
					value: false
				},

				/**
				 * True if the dialog should be rendered before first call to `open`.
				 */
				prerender: {
					type: Boolean,
					value: false
				},

				/**
				 * Set to true to disable closing dialog with the ESC key
				 */
				noCancelOnEscKey: {
					type: Boolean,
					value: false
				},

				/**
				 * Set to true to diable closing dialog when clicking outside of dialog
				 */
				noCancelOnOutsideClick: {
					type: Boolean,
					value: true
				}
			};
		}

		static get hostAttributes() {
			return {
				role: 'dialog',
				tabindex: '-1'
			};
		}

		constructor() {
			super();
			// The generated paper-dialog element
			this._paperDialog = null;
			this._templateInstance = null;

			this._dialogEventsHandler = this._handlePaperDialogEvents.bind(this);
			this._dialogCloseEventHandler = this.close.bind(this);
			this._pendingProps = {};
			this._spawn = this._spawn.bind(this);
			this._spawnSteps = [this._createDialog, this._createInstance];
		}

		connectedCallback() {
			super.connectedCallback();
			this._observer = new FlattenedNodesObserver(this, this._onNodesChange);
			window.addEventListener('cosmoz-dialog-closeall', this._dialogCloseEventHandler);
		}

		disconnectedCallback() {
			super.disconnectedCallback();
			if (this._observer) {
				this._observer.disconnect();
				this._observer = null;
			}
			this._detachDialog();
			window.removeEventListener('cosmoz-dialog-closeall', this._dialogCloseEventHandler);
			this._templateInstance = null;
		}

		_spawn() {
			const step = this._spawnSteps.shift();
			if (!step) {
				return;
			}
			step.call(this);
			microTask.run(() => this._spawn());
		}

		/**
	 * Get the generated paper-dialog element
	 */
		get paperDialog() {
			return this._paperDialog;
		}

		open() {
			if (!this._userTemplate) {
				return;
			}

			this._spawnSteps.splice(0).forEach(step => step.call(this));

			this._attachDialog();
			this._paperDialog.open();
		}

		_attachDialog() {
			if (!this._paperDialog.parentNode) {
				document.body.appendChild(this._paperDialog);
			}
		}

		_detachDialog() {
			const dialog = this._paperDialog;
			if (dialog == null) {
				return;
			}
			dialog.removeEventListener('iron-overlay-opened', this._dialogEventsHandler);
			dialog.removeEventListener('iron-overlay-closed', this._dialogEventsHandler);

			if (!dialog.parentNode) {
				return;
			}
			dialog.parentNode.removeChild(dialog);
		}

		close() {
			if (this._paperDialog != null) {
				this._paperDialog.close();
			}
		}

		fit() {
			if (this._paperDialog != null && this._paperDialog.opened) {
				this._paperDialog.fit();
			}
		}

		refit() {
			if (this._paperDialog != null && this._paperDialog.opened) {
				this._paperDialog.refit();
			}
		}

		center() {
			if (this._paperDialog != null && this._paperDialog.opened) {
				this._paperDialog.center();
			}
		}

		_onNodesChange({addedNodes}) {
			if (this._userTemplate) {
				return;
			}
			const template = Array.from(addedNodes)
				.filter(n => n.nodeName === 'TEMPLATE')
				.pop();

			if (!template) {
				// eslint-disable-next-line no-console
				console.warn('cosmoz-dialog-behavior requires a template');
				this._spawnSteps.splice(0);
			}

			this._userTemplate = template;

			this._instanceCtor = templatize(template, this, {
				instanceProps: {},
				parentModel: true,
				forwardHostProp: this._forwardHostProp
			});

			if (!this.prerender) {
				return;
			}

			microTask.run(() => this._spawn());
		}

		_createDialog() {
			if (!this._userTemplate) {
				return;
			}

			const dialog = document.createElement('paper-dialog');

			dialog.noAutoFocus = this.noAutoFocus;
			dialog.noCancelOnEscKey = this.noCancelOnEscKey;
			dialog.noCancelOnOutsideClick = this.noCancelOnOutsideClick;
			dialog.withBackdrop = this.withBackdrop;

			dialog.addEventListener('iron-overlay-opened', this._dialogEventsHandler);
			dialog.addEventListener('iron-overlay-closed', this._dialogEventsHandler);

			this._paperDialog = dialog;
			return dialog;
		}

		_createInstance() {
			if (!this._paperDialog) {
				return;
			}

			const instance = new this._instanceCtor(this._pendingProps);
			this._templateInstance = instance;

			this._paperDialog.appendChild(instance.root);

			if (instance._flushProperties) {
				instance._flushProperties(true);
			}
		}

		_handlePaperDialogEvents(event) {
			this.dispatchEvent(new CustomEvent(event.type, {
				bubbles: true,
				composed: true,
				detail: {
					originalTarget: event.target
				}
			}));
		}

		_forwardHostProp(prop, value) {
			const instance = this._templateInstance;
			if (!instance) {
				this._pendingProps[prop] = value;
				return;
			}

			if (instance.forwardHostProp) {
				instance.forwardHostProp(prop, value);
				return;
			}
			instance[prop] = value;
		}
	}
);
