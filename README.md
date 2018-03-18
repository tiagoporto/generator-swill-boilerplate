# Swill Boilerplate Generator

<p align="right">
  <code>LIKED ? Leave a <a href="https://github.com/tiagoporto/generator-swill-boilerplate">⭐</a> : 😞</code>
</p>

[![Release](https://img.shields.io/npm/v/generator-swill-boilerplate.svg?style=flat-square&label=release)](https://npmjs.org/package/generator-swill-boilerplate)
[![Downloads](https://img.shields.io/npm/dt/generator-swill-boilerplate.svg?style=flat-square)](https://www.npmjs.com/package/generator-swill-boilerplate)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-yellow.svg?style=flat-square)](http://standardjs.com)
[![Build Status](https://img.shields.io/travis/tiagoporto/generator-swill-boilerplate.svg?style=flat-square&logo=travis)](https://travis-ci.org/tiagoporto/generator-swill-boilerplate)
[![Coverage Status](https://img.shields.io/coveralls/tiagoporto/generator-swill-boilerplate.svg?style=flat-square)](https://coveralls.io/github/tiagoporto/generator-swill-boilerplate)
[![Dependencies Status](https://img.shields.io/david/tiagoporto/generator-swill-boilerplate.svg?style=flat-square)](https://david-dm.org/tiagoporto/generator-swill-boilerplate)
[![devDependencies Status](https://img.shields.io/david/dev/tiagoporto/generator-swill-boilerplate.svg?style=flat-square)](https://david-dm.org/tiagoporto/generator-swill-boilerplate?type=dev)


<p align="center">
  <img src="http://tiagoporto.github.io/swillboilerplate.rocks/img/logos/logo.png" alt="Swill Boilerplate Logo">
  <img src="https://nerdsondotcom.files.wordpress.com/2013/03/yeoman-logo.png" alt="Yeoman Logo" height="215">
</p>

> Yeoman generator for [Swill Boilerplate](http://swillboilerplate.rocks)

## Features

* Cleans the assets (build, images, CSS, JS) in the project to maintain the directory organization
* Compresses Images
* Generates Sprites with .png
* Generates Sprites with .svg and a .png to fallback
* Analyzes CSS with CSS Lint
* Prefixes CSS with Autoprefixer
* Compiles Sass or Stylus (Catches Stylus errors and shows them directly on the page, as in Sass)
* Combines matching media queries into one
* Concatenates and minifies scripts
* Analyzes JavaScript with ESLint
* Compiles ES2015, ES2016 and ES2017
* Validates HTML
* Notifies when tasks are complete
* Monitors changes in the files and reloads the browser with BrowserSync
* Uses Jasmine & Karma to test JavaScript
* Builds the project compressing HTML, CSS and JS
* Pushes the `build` folder to gh-pages branch
* Uses [http://standardjs.com/](JavaScript Standard Style)

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


## Docs

[Swill Boilerplate](http://swillboilerplate.rocks)

