# cosmoz-dialog

Cosmoz dialog component built with pionjs

> **Note:** This package was previously published as `@neovici/cosmoz-dialog-next`. Starting from v4.0.0, it replaces the old Polymer-based `@neovici/cosmoz-dialog` (v3.x and earlier).

## Sheet on narrow viewports

Set `sheet` to dock a dialog to the bottom edge as a sheet on viewports narrower than 640px. It spans the full width, respects the bottom safe area and is not draggable there. Wider viewports keep the floating dialog.

```html
<my-dialog sheet heading="Edit row"></my-dialog>
```

## Extra styles

`dialog(renderer, { styleSheets })` adds the given sheets after the dialog's own styles.
