cosmoz-dialog
=============

[![Build Status](https://travis-ci.org/Neovici/cosmoz-dialog.svg?branch=master)](https://travis-ci.org/Neovici/cosmoz-dialog)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/Neovici/cosmoz-dialog)

cosmoz-dialog is a Polymer component workaround for paper-dialog that fit the
backdrop to the element specified by the `fitInto` property.

## Credits

## Usage

Example:

<!---
```
<custom-element-demo>
	<template>
		<script src="../webcomponentsjs/webcomponents-lite.js"></script>
		<link rel="import" href="../iron-demo-helpers/demo-snippet.html">
		<link rel="import" href="../iron-demo-helpers/demo-pages-shared-styles.html">
		<link rel="import" href="../paper-button/paper-button.html">
		<link rel="import" href="cosmoz-dialog.html">
		<next-code-block></next-code-block>
	</template>
</custom-element-demo>
```
-->
```html
<cosmoz-dialog with-backdrop id="dialogInRootStackingContext">
	<template>
		<h2>Dialog Title</h2>
		<p>
			This dialog is created in the root stacking context.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
			nisi ut aliquip ex ea commodo consequat. Duis aute
			irure dolor in reprehenderit in voluptate velit esse cillum dolore
			eu fugiat nulla pariatur.
			Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
			officia deserunt mollit anim id est laborum.
		</p>
		<div class="buttons">
			<paper-button dialog-dismiss>Cancel</paper-button>
			<paper-button dialog-confirm>Accept</paper-button>
		</div>
	</template>
</cosmoz-dialog>
```

### Install

`bower install --save Neovici/cosmoz-dialog`

### Add the cosmoz-dialog import

```html
<link rel="import" href="bower_components/cosmoz-dialog/cosmoz-dialog.html" />
```

## Documentation

See http://neovici.github.io/cosmoz-dialog.

## Contributing

### Running tests

`cosmoz-dialog` uses `web-component-tester` to run tests.
`web-component-tester` uses `selenium-standalone` to execute the tests, and since `selenium-standalone` is not always up to date with WebDrivers versions, 
we have to override the defaults using `SELENIUM_OVERRIDES_CONFIG` environment variable.

On windows, uses:
```
set SELENIUM_OVERRIDES_CONFIG=../../../selenium-overrides-win.json
```

On *nix like environements, uses
```
export SELENIUM_OVERRIDES_CONFIG=../../../selenium-overrides-linux.json
```
