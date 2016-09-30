# Swill Boilerplate Generator
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![devDependencies Status](https://img.shields.io/david/dev/tiagoporto/generator-swill-boilerplate.svg)](https://david-dm.org/tiagoporto/generator-swill-boilerplate#info=devDependencies)
[![Coverage percentage][coveralls-image]][coveralls-url]
[![Github License](https://img.shields.io/github/license/tiagoporto/generator-swill-boilerplate.svg)](http://opensource.org/licenses/MIT)

<p align="center">
  <img src="http://tiagoporto.github.io/swill-boilerplate/img/logos/logo.png" alt="Swill Boilerplate Logo">
  <img src="https://nerdsondotcom.files.wordpress.com/2013/03/yeoman-logo.png" alt="Yeoman Logo" height="215">
</p>

> Yeoman generator for [Swill Boilerplate](https://github.com/tiagoporto/swill-boilerplate)

## Features

* Clean the assets (build, images, css, js) in the project to maintain the directory organized
* Compress Images
* Generate Sprites with .png
* Generate Sprites with .svg and a .png to fallback
* Analyze CSS with csslint
* Prefix CSS with Autoprefixer
* Compile Sass or Stylus (Catch the Stylus error and direct shows on the page, as in Sass)
* Concatenate And Minify Scripts
* Analyze JavaScript with ESLint
* Compile ES2015
* Notify when tasks are complete
* Monitors changes in the files and reload browser with BrowserSync
* Javascript tests with Jasmine and Karma
* Build the project compressing HTML, CSS and JS.
* Push the `build` folder to gh-pages branch

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


## License

Swill Boilerplate Generator is released under the terms of the [MIT license](https://github.com/tiagoporto/generator-swill-boilerplate/blob/master/LICENSE).


[npm-image]: https://badge.fury.io/js/generator-swill-boilerplate.svg
[npm-url]: https://npmjs.org/package/generator-swill-boilerplate
[travis-image]: https://travis-ci.org/tiagoporto/generator-swill-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.org/tiagoporto/generator-swill-boilerplate
[daviddm-image]: https://david-dm.org/tiagoporto/generator-swill-boilerplate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tiagoporto/generator-swill-boilerplate
[coveralls-image]: https://coveralls.io/repos/tiagoporto/generator-swill-boilerplate/badge.svg
[coveralls-url]: https://coveralls.io/r/tiagoporto/generator-swill-boilerplate
