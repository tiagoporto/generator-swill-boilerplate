# Swill Boilerplate Generator

[![Build Status](https://travis-ci.org/tiagoporto/generator-swill-boilerplate.svg)](https://travis-ci.org/tiagoporto/generator-swill-boilerplate)
[![Coverage Status](https://img.shields.io/coveralls/tiagoporto/generator-swill-boilerplate.svg)](https://coveralls.io/github/tiagoporto/generator-swill-boilerplate)
[![NPM version](https://badge.fury.io/js/generator-swill-boilerplate.svg)](https://npmjs.org/package/generator-swill-boilerplate)
[![NPM Downloads](https://img.shields.io/npm/dt/generator-swill-boilerplate.svg)](https://www.npmjs.com/package/generator-swill-boilerplate)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Github License](https://img.shields.io/github/license/tiagoporto/generator-swill-boilerplate.svg)](https://raw.githubusercontent.com/tiagoporto/generator-swill-boilerplate/master/LICENSE)

<small>Generator Dependencies:</small>
[![Dependencies Status](https://david-dm.org/tiagoporto/generator-swill-boilerplate.svg)](https://david-dm.org/tiagoporto/generator-swill-boilerplate)
 [![devDependencies Status](https://david-dm.org/tiagoporto/generator-swill-boilerplate/dev-status.svg)](https://david-dm.org/tiagoporto/generator-swill-boilerplate?type=dev)

<small>Swill Boilerplate Dependencies:</small>
[![boilerplate devDependencies Status](https://david-dm.org/tiagoporto/swillboilerplate.rocks/dev-status.svg)](https://david-dm.org/tiagoporto/swillboilerplate.rocks?type=dev)

<p align="center">
  <img src="http://tiagoporto.github.io/swillboilerplate.rocks/img/logos/logo.png" alt="Swill Boilerplate Logo">
  <img src="https://nerdsondotcom.files.wordpress.com/2013/03/yeoman-logo.png" alt="Yeoman Logo" height="215">
</p>

> Yeoman generator for [Swill Boilerplate][swill-website]


## Features

* Cleans the assets (build, images, CSS, JS) in the project to maintain the directory organization
* Compresses Images with [Imagemin](https://github.com/imagemin/imagemin)
* Generates PNG and SVG(PNG to fallback) Sprites
* Analyzes CSS with [CSS Lint](http://csslint.net) *optional
* Prefixes CSS with [Autoprefixer](https://github.com/postcss/autoprefixer)
* Compiles Sass or Stylus (Catches Stylus errors and shows them directly on the page, as in Sass)
* Combines matching media queries into one
* Compiles scripts with [Babel](https://babeljs.io) and bundle with [Webpack](https://webpack.js.org)
* Analyzes JavaScript with [ESLint](https://eslint.org) *optional
* Uses [http://standardjs.com/](JavaScript Standard Style)
* Uses [Handlebars](http://handlebarsjs.com) *optional
* Validates HTML
* Task Completion Notifications
* Monitors changes in the files and automatically reloads the browser with [BrowserSync](https://www.browsersync.io)
* Uses [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to test JavaScript and coverage with [Istanbul](https://istanbul.js.org/).
* Builds the project by compressing HTML, CSS and JS
* Pushes the `build` folder to gh-pages branch

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-swill-boilerplate` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-swill-boilerplate
```

Then generate your new project:

```bash
yo swill-boilerplate
```

Creating a style file

In the project folder execute
```bash
yo swill-boilerplate:style
```

This will create a style file in components folder and import it into _index.{styl,scss}


## Docs

[Swill Boilerplate][swill-website]

## License

Swill Boilerplate Generator is released under the terms of the [MIT license](https://github.com/tiagoporto/generator-swill-boilerplate/blob/master/LICENSE).



[swill-website]: http://swillboilerplate.rocks
