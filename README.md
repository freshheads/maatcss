# FH STYLE STANDARDS

**Extensible, scalable, Sass-based modules that can be used as starting point for UI projects**

The Freshheads Style Standards do not provide you with UI and design out of the box, instead, it provides you with a solid architectural baseline upon which to complete your own work.
Every module can be replaced, ignored or extended so it doesn't limit you when new strategies or technologies arise.

## Features

* BEM
* Flexbox layouts
* Custom breakpoints
* Rem based font sizes
* Basic form styling with custom checkboxes, radios and selects
* Guidelines for your project structure (can be diverged from, this is not the holy grail) 

## Installation

Add the fh-style-standards package to your app package.json. Using `semver` in Git URLs was introduced in NPM5, you can use the original tag notation (e.g. style-standards#v2.0.0) on older versions of NPM.

```
"fh-style-standards": "git+ssh://git@github.com/freshheads/style-standards#semver:^2.0.0",
```

## Usage

Once you have the style standards in your project you first need to copy the example.main.scss file into your project directory structure and rename this to your application entry point.
This file accesses the style standard modules, and you can extend it with your own UI component modules.

The imports in this file need to be changed to the location of the fh-style-standards node module. e.g. `'~fh-style-standards/generic/toplevel'`

### Directory structure guidelines

The FH Style Standards follow a specific directory structure, which you hopefully follow as well in your own CSS directory:

* `/settings`: Global variables, site-wide settings, transcending component settings.
* `/tools`: Site-wide mixins and functions.
* `/generic`: Low-specificity, far-reaching rulesets (e.g. resets, typography, wrappers).
* `/layout`: Our own flexbox based grid.
* `/components`: BEM minded, independent blocks of UI. A few essentials are provided e.g. forms and buttons.
* `/utilities`: High-specificity, very explicit selectors. Overrides and helper
  classes. You can use tools to create them.

### Module specific guidelines

Most options are explained in the index.html which can be viewed by starting the web server.
The setting variables should be clear, but be free to add comments in the code.

## Development 

Start a local server using webpack 2 , webpack-dev-server and auto refresh :)

```
npm install
```

```
npm run start
```
