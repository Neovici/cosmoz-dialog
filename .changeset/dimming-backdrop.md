---
"@neovici/cosmoz-dialog": patch
---

Dim the page behind dialogs in dark mode

The backdrop used `--cz-color-bg-overlay` at 70%, which is gray-800 in dark
mode and lightened the gray-950 page into a gray haze. It is now a
black-based scrim in both schemes: gray-950 at 45% in light, black at 60% in
dark.
