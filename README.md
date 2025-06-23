# @neovici/cosmoz-dialog-next

A Pion component for displaying modal dialogs with React-like hooks, extracted from the core component library as a standalone package.

## Features

- **Native HTML Dialog**: Uses the modern HTML `<dialog>` element with `showModal()`
- **React-style Hooks**: Powered by Pion.js (fork of Haunted.js) with hooks like `useRef`, `useEffect`
- **Customizable Footer Actions**: Full control over button text, state, and visibility
- **Draggable Dialogs**: Click and drag the title bar to move dialogs around (unless `unmovable`)
- **Keyboard Navigation**: Escape key handling, focus management, and accessibility support
- **Loading States**: Built-in spinner support with `cz-spinner` integration
- **Form Integration**: Automatic form data collection on confirm
- **TypeScript Support**: Full type definitions included

## Installation

```bash
npm install @neovici/cosmoz-dialog-next
```

## Dependencies

This component requires:

- `@pionjs/pion` - The web component framework
- `@neovici/cosmoz-utils` - For the `cz-spinner` element and CSS utilities
- `lit-html` - For templating

## Usage

### Dialog Constructor Pattern (Recommended)

Use the `dialog` constructor to create custom dialog components:

```javascript
import { html } from 'lit-html';
import { dialog } from '@neovici/cosmoz-dialog-next';

const MyDialog = dialog((host) => {
	return html`
		<div style="padding: 1rem;">
			<p>Welcome ${host.username}!</p>
			<p>This is a custom dialog with dynamic content.</p>
		</div>
	`;
});

customElements.define('my-dialog', MyDialog);
```

### Using the Default CosmozDialogNext Component

For simple cases, use the default component with slot content:

```javascript
import { CosmozDialogNext } from '@neovici/cosmoz-dialog-next';

// register the default dialog
customElements.define('cosmoz-dialog-next', CosmozDialogNext);
```

```html
<cosmoz-dialog-next title="Simple Dialog" closeable>
	<p>This content goes in the slot.</p>
</cosmoz-dialog-next>
```

## Important: Property vs Attribute Binding

When using the dialog in lit-html templates, use **property binding** (`.property=`) for complex data:

```javascript
html`
	<my-dialog
		.title=${'Dynamic Title'}
		.content=${'Dynamic content'}
		.footerActions=${{
			confirm: { text: 'Save' },
			cancel: { text: 'Cancel' },
		}}
		?open=${isOpen}
		?closeable=${true}
	></my-dialog>
`;
```

## Properties

| Property               | Type            | Default     | Description                                       |
| ---------------------- | --------------- | ----------- | ------------------------------------------------- |
| `title` / `heading`    | `string`        | `undefined` | Dialog title text                                 |
| `open`                 | `boolean`       | `false`     | Whether the dialog is open                        |
| `closeable`            | `boolean`       | `false`     | Show close button and allow Escape/backdrop close |
| `unmovable`            | `boolean`       | `false`     | Disable drag functionality                        |
| `manualFocus`          | `boolean`       | `false`     | Disable automatic focus management                |
| `defaultFooterActions` | `boolean`       | `false`     | Show default OK/Cancel buttons                    |
| `footerActions`        | `FooterActions` | `undefined` | Custom footer configuration                       |
| `loading`              | `boolean`       | `false`     | Show loading spinner instead of content           |
| `onClose`              | `function`      | `undefined` | Callback when dialog closes                       |

## Footer Actions Configuration

```typescript
interface FooterActions {
	confirm?: {
		text: string; // button text (default: "OK")
		disabled?: boolean; // disable the button (default: false)
	};
	cancel?: {
		text: string; // button text (default: "Cancel")
		hidden?: boolean; // hide the cancel button (default: false)
	};
}
```

### Example with Custom Footer Actions

```javascript
const dialogElement = document.querySelector('my-dialog');

// set via property
dialogElement.footerActions = {
	confirm: {
		text: 'Save Changes',
		disabled: false,
	},
	cancel: {
		text: 'Discard',
		hidden: false,
	},
};

// or in lit-html template
html`
	<my-dialog
		.footerActions=${{
			confirm: { text: 'Accept Terms' },
			cancel: { text: 'Decline' },
		}}
		?default-footer-actions=${true}
	></my-dialog>
`;
```

## Events

| Event            | Detail      | Description                                                                               |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `dialog-confirm` | `FormData`  | Fired when confirm button is clicked. Includes form data if dialog contains form elements |
| `dialog-cancel`  | `undefined` | Fired when cancel button is clicked or dialog is cancelled (Escape/backdrop)              |

### Event Handling Example

```javascript
const dialog = document.querySelector('my-dialog');

dialog.addEventListener('dialog-confirm', (e) => {
	console.log('Dialog confirmed with data:', e.detail);
	// e.detail contains FormData entries from any form elements in the dialog
});

dialog.addEventListener('dialog-cancel', () => {
	console.log('Dialog was cancelled');
});
```

## Form Integration

The dialog automatically collects form data when confirmed:

```javascript
const FormDialog = dialog(() => {
	return html`
		<form style="padding: 1rem;">
			<div>
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" required />
			</div>
			<div>
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required />
			</div>
		</form>
	`;
});

// the dialog-confirm event will contain:
// { name: "John Doe", email: "john@example.com" }
```

## Advanced Examples

### Loading Dialog

```javascript
html`
	<my-dialog
		.title=${'Processing...'}
		?loading=${true}
		?closeable=${false}
		?open=${isProcessing}
	></my-dialog>
`;
```

### Non-Closeable Dialog

```javascript
html`
	<my-dialog
		.title=${'Important Notice'}
		.content=${'You must accept the terms to continue.'}
		?closeable=${false}
		?default-footer-actions=${true}
		.footerActions=${{
			confirm: { text: 'Accept' },
			cancel: { hidden: true },
		}}
	></my-dialog>
`;
```
