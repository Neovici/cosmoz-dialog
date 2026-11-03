# cosmoz-dialog

Cosmoz dialog component built with pionjs

> **Note:** This package was previously published as `@neovici/cosmoz-dialog-next`. Starting from v4.0.0, it replaces the old Polymer-based `@neovici/cosmoz-dialog` (v3.x and earlier).

## Sheet on narrow viewports

On viewports narrower than 640px, dialogs dock to the bottom edge as a sheet. They span the full width, respect the bottom safe area and are not draggable there. Wider viewports keep the floating dialog.

## Extra styles

`dialog(renderer, { styleSheets })` adds the given sheets after the dialog's own styles.
