# Swill Boilerplate

![gulp.js Logo](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp.png)

Basic Template Front-End with [Gulp.js](http://gulpjs.com/)

Current version - **3.0.0beta**

I started this template when I start working with Gulp.js. When the google launch the [Web Starter Kit](https://developers.google.com/web/starter-kit/). I saw that I'm on the right track.

Uses the following technologies:

* [Angular.js](https://angularjs.org/)
* [Animate.css](http://daneden.github.io/animate.css/)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Bower](http://bower.io/)
* [BrowserSync](http://www.browsersync.io/)
* [EditorConfig](http://editorconfig.org/)
* [Gulp.js](http://gulpjs.com/)
* [Jquery](http://jquery.com/)
* [JSHint](http://www.jshint.com/)
* [Node.js](http://nodejs.org/)
* [Normalize.css](http://necolas.github.io/normalize.css/)
* [NPM](https://www.npmjs.com/)
* [Outdated Browser](http://outdatedbrowser.com/)
* [Retina.js](http://imulus.github.io/retinajs/)
* [Stylus](http://learnboost.github.io/stylus/)
* [Twitter Bootstrap](http://getbootstrap.com/)


## Table of Contents

* [Features](#features)
* [Includes](#includes)
* [Folder Structure](#folder-structure)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Usage](#usage)
* [License](license)


## Features

* Clean the assets (images, css, js) in the project to maintain the directory organized
* Compress Images
* Generate Sprites
* Concatenate And Minify JavaScript
* Analyze JavaScript with jshint
* Functions and [mixins](https://github.com/tiagoporto/sass-mixins) to use with Sass
* Compile Sass
* Generate sourcemap to help develop with sass
* Notify when tasks are complete
* Monitors changes in the files and reload browser with [BrowserSync](http://www.browsersync.io/)
* Configs from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
* Check if the browser is outdated with [Outdated Browser](http://outdatedbrowser.com/)
* Build the project compressing the HTML and the CSS.

## Include

* [AngularJS](http://angularjs.org/)
* [Animate.css](https://github.com/daneden/animate.css)
* [Bootstrap](http://getbootstrap.com/)
* [Google Analytics](http://www.google.com/analytics/)
* [jQuery](http://jquery.com/)
* [Jquery Mobile](http://jquerymobile.com/)
* [jQuery UI](http://jqueryui.com/)
* [Outdated Browser](http://outdatedbrowser.com/)
* [Underscore.js](http://underscorejs.org/)

Just remove what you will not use or include in specific directories: `src/scripts` and `src/stylesheets`.


## Folder Structure

```
./
├─┐
│  ├─ node_modules
│  │  └─ // NPM packages
│  │
│  ├─ build //Folder with the build project
│  │
│  ├─ node-modules //Will appear after installed the NPM modules
│  │  └─ //All Gulp.js plugins
│  │
│  ├─ public //Files for deployment
│  │  ├─ css
│  │  │  └─ //CSS public css
│  │  │
│  │  ├─ fonts
│  │  │  └─ //Web Fonts
│  │  │
│  │  ├─ images
│  │  │  └─ //public images
│  │  │
│  │  ├─ js
│  │  │  └─ //public scripts
│  │  │
│  │  ├─ lang
│  │  │  │
│  │  │  ├─ outdated_browser //langs to outdated browser plugin
│  │  │  │
│  │  │  └─ //langs to multilingue sites
│  │  │
│  │  ├─ .htaccess //Configuration for use on web servers running the Apache Web Serve
│  │  │
│  │  ├─ apple-touch-icon-precomposed.png //Icon for Safari on iOS
│  │  │
│  │  ├─ crossdomain.xml //Permission to handle data across multiple domain s
│  │  │
│  │  ├─ manifest.json //Provides information about an Chrome app https://developer.chrome.com/extensions/manifest
│  │  │
│  │  ├─ manifest.webapp //Provides information about an Firefox OS app https://developer.mozilla.org/pt-BR/Apps/Manifest
│  │  │
│  │  ├─ robots.txt //Give instructions about their site to search engines
│  │  │
│  │  ├─ favicon.ico //Icon for address bar and bookmark
│  │  │
│  │  └─ //HTML or PHP, etc Files
│  │
│  └─ src //Source files for the projects
│       ├─ images //Original imagens, don't compressed
│       │  │
│       │  ├─ sprite //Images to generate the sprite
│       │  │
│       │  └─ touch //Icons to Mobile
│       │      │
│       │      ├─ chrome-touch-icon-192x192.png //Icon for Chrome on Android
│       │      │
│       │      ├─ icon-128x128.png //Icon for Firefox on FirefoxOS
│       │      │
│       │      ├─ tile.png //Tile icon for Win8
│       │      │
│       │      └─ tile-wide.png //Wide tile icon for Win8
│       │
│       ├─ scripts
│       │  │
│       │  ├─ angular //Development AngularJS
│       │  │
│       │  ├─ dependencies
│       │  │  │
│       │  │  ├─ frameworks
│       │  │  │
│       │  │  ├─ libs
│       │  │  │
│       │  │  └─ plugins
│       │  │
│       │  ├─ jquery
│       │  │  │
│       │  │  ├─ onread //Open and close elements of Jquery
│       │  │  │
│       │  │  └─ //Development JQuery
│       │  │
│       │  ├─ settings //Necessary settings to setup plugins, etc.
│       │  │
│       │  └─ //Development Javascript files will be concatenated and minify
│       │
│       └─ stylesheets
│            │
│            ├─ dependencies //Styles used by external plugins
│            │
│            ├─ helpers
│            │  │
│            │  ├─ mixins
│            │  │
│            │  ├─ _functions.sass
│            │  │
│            │  ├─ _mixins.sass
│            │  │
│            │  └─ _variables.sass
│            │
│            ├─ media_queries
│            │
│            ├─ typography
│            │
│            ├─ _base.sass //Main Styles
│            │
│            ├─ normalize.css //Normalize
│            │
│            ├─ _sprite.sass //Generated class with use sprite
│            │
│            └─ styles.sass //Base SASS with imports
│
├─ .editorconfig // Settings of editorconfig plugin
├─ .jshintrc // JSHint configuration file
├─ bower.json // Bower dependencies
├─ gulpfile.js // Gulp.js configuration file
├─ package.json // NPM dependencies
└─ README.md // Documentation
```

## Dependencies

1. [Node.js](http://nodejs.org/) installation

  `Mark npm package manager`


1. Install [Gulp.js](http://gulpjs.com/)

  ```sh
  $ npm install gulp -g
  ```

  For Mac or Linux User

  ```sh
  $ sudo npm install gulp -g
  ```

1. [gulp-ruby-sass](https://www.npmjs.org/package/gulp-ruby-sass) require ruby and Sass 3.3+

  For Windows Users is necessary install ruby

  Download [Ruby](https://www.ruby-lang.org/pt/)

  Download Development Kit from [Ruby Installer](http://rubyinstaller.org/downloads/)

  * Unzip the zip
  * Open command-line and go to unzipped folder
  * `ruby dk.rb init`
  * `ruby dk.rb install`
  * `gem install rdiscount --platform=ruby`

```sh
$ gem update --system
$ gem install sass
```

Go to the local folder
```sh
$ cd swill-boilerplate
```

Install dependences of npm
```sh
$ npm install
```

###EditorConfig

To work with [EditorConfig](http://editorconfig.org/) it's necessary install the plugin on your text editor.

Look if your text editor is supported, and make the download

[http://editorconfig.org/#download](http://editorconfig.org/#download)

## Usage

Go to the local folder

```sh
$ cd swill-boilerplate
```

Execute to development

```sh
$ gulp
```

Execute to build the project

```sh
$ gulp build
```

### BrowserSync

If you will work with dinamic files like .php, it's necessary make changes in gulpfile.js to BrowserSync works

Remove the lines
```
server: {
	baseDir: [basePaths.src, basePaths.dest]
}
```
Set the url to the server
```
proxy: "localhost/swill-boilerplate/public/"
```

### Sprites

This template uses [gulp.spritesmith](https://www.npmjs.org/package/gulp.spritesmith) to generate sprites.

When the sprite is generated, a file `_sprite.sass` is created with four mixins and the variables of the parameters of the images, like height and width (the names of the variables is same of the original file before the compilation).

**`_sprite.sass` example**

```scss

$left-arrow-x: 0px;
$left-arrow-y: 0px;
$left-arrow-offset-x: 0px;
$left-arrow-offset-y: 0px;
$left-arrow-width: 32px;
$left-arrow-height: 32px;
$left-arrow-total-width: 32px;
$left-arrow-total-height: 66px;
$left-arrow-image: '../images/sprite.png';

@mixin sprite-width($sprite) {
  width: nth($sprite, 5);
}

@mixin sprite-height($sprite) {
  height: nth($sprite, 6);
}

@mixin sprite-position($sprite) {
  $sprite-offset-x: nth($sprite, 3);
  $sprite-offset-y: nth($sprite, 4);
  background-position: $sprite-offset-x  $sprite-offset-y;
}

@mixin sprite-image($sprite) {
  $sprite-image: nth($sprite, 9);
  background-image: url(#{$sprite-image});
}

@mixin sprite($sprite) {
  @include sprite-image($sprite);
  @include sprite-position($sprite);
  @include sprite-width($sprite);
  @include sprite-height($sprite);
}
```

Just use the mixins with the variables as parameters.

**Example**

```sass
#arrow
	+sprite($left-arrow)

	&:hover
		+sprite-position($right-arrow)
```

**Output**

```css
#arrow {
	background-image: url(../images/sprite.png);
	background-position: 0px 0px;
	width: 32px;
	height: 32px;
}
#arrow:hover {
	background-position: 0px -34px;
}
```

## License

Swill Boilerplate is released under the terms of the [MIT license](http://opensource.org/licenses/MIT).