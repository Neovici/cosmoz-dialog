---
"@neovici/cosmoz-dialog": minor
---

Accessible dialogs, following the Base UI Dialog contract:

- The dialog is named by its heading and described by its subtitle; the close button has a name.
- On open, focus moves to the first `[autofocus]` element in the content, else the first tabbable element (through shadow roots). Before, content that rendered after `showModal()` left focus on the dialog.
- Focus returns to where it was when the dialog is removed, not only when it is closed.
- New `uncancelable` property: Escape no longer closes the dialog.
- New `alert` property renders an `alertdialog`.

`i18next` is now a peer dependency (for the close button label).
