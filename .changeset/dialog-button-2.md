---
"@neovici/cosmoz-dialog": minor
---

cosmoz-dialog depends on cosmoz-button ^2.5.0: the redesigned button ships with the dialog, and its host accessibility attributes (aria-label, tooltip, tabindex) reach the native control. Widening to the v2 line also removes the last button-v1 range in cosmoz-form's dependency tree, so the form's singleton overrides lose their last reason.
