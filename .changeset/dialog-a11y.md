---
"@neovici/cosmoz-dialog": minor
---

Accessible dialogs, following the Base UI Dialog contract:

- The dialog is named by its heading and described by its subtitle; the close button has a name.
- The dialog opens once its content has rendered, so the browser picks the initial focus: an `[autofocus]` element, else the first focusable one (into components with `delegatesFocus`). Before, `showModal()` ran before the content existed and focus stayed on the dialog. Because of this, the dialog opens one frame after it renders: tests that interact with it straight away should wait for `dialog.open`.
- The close button moved after the content in the DOM (same place on screen), so it isn't the first thing focused.
- Focus returns to where it was when the dialog is removed, not only when it is closed.
- New `uncancelable` property: Escape no longer closes the dialog.
- New `alert` property renders an `alertdialog`.

`i18next` is now a peer dependency (for the close button label).
