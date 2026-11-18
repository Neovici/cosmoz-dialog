---
"@neovici/cosmoz-dialog": patch
---

Line up dialog content with the button row. The scrolling content no longer reserves an extra `--cz-scrollbar-width` of right padding, so form fields end where the buttons end instead of 8px short. When the content scrolls, the scrollbar takes its own width as usual.
