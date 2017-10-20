# Maat.css

**Extensible, scalable, Sass-based modules that can be used as starting point for UI projects**

The maat.css modules do not provide you with UI and design out of the box, instead, it provides you with a solid architectural baseline upon which to complete your own work.
Every module can be replaced, ignored or extended so it doesn't limit you when new strategies or technologies arise.

## Features

* BEM
* Flexbox layouts
* Custom breakpoints
* Rem based font sizes
* Basic form styling with custom checkboxes, radios and selects
* Guidelines for your project structure (can be diverged from, this is not the holy grail) 

## Installation

Add the maat.css package to your package.json.

```bash
npm install maatcss
```

## Usage

Once you have the maat.css in your project you first need to copy the example.main.scss file into your project directory structure and rename this to your application entry point.
This file accesses the maat.css modules, and you can extend it with your own UI component modules.

The imports in this file need to be changed to the location of the maat.css node module. e.g. `'~maatcss/generic/toplevel'` when using Webpack.

### Directory structure guidelines

Maat.css follows a specific directory structure, which you hopefully follow as well in your own CSS directory:

* `/settings`: Global variables, site-wide settings, transcending component settings.
* `/tools`: Site-wide mixins and functions.
* `/generic`: Low-specificity, far-reaching rulesets (e.g. resets, typography, wrappers).
* `/layout`: Our own flexbox based grid.
* `/components`: BEM minded, independent blocks of UI. A few essentials are provided e.g. forms and buttons.
* `/utilities`: High-specificity, very explicit selectors. Overrides and helper
  classes. You can use tools to create them.

### Module specific guidelines

[Maat.css documentation](https://freshheads.github.io/maatcss-docs/)

## Development 

Start a local server using webpack >=2 and webpack-dev-server

```
npm install
```

```
npm run start
```
