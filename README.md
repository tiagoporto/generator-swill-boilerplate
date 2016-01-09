# Swill Boilerplate

[![devDependencies Status](https://img.shields.io/david/dev/tiagoporto/swill-boilerplate.svg)](https://github.com/tiagoporto/swill-boilerplate)
[![Github Release](https://img.shields.io/github/release/tiagoporto/swill-boilerplate.svg)](https://github.com/tiagoporto/swill-boilerplate)
[![Github Issues](https://img.shields.io/github/issues/tiagoporto/swill-boilerplate.svg)](https://github.com/tiagoporto/swill-boilerplate/issues)
[![Github License](https://img.shields.io/github/license/tiagoporto/swill-boilerplate.svg)](http://opensource.org/licenses/MIT)

<p align="center">
	<img src="http://tiagoporto.github.io/swill-boilerplate/img/logos/logo.png" alt="Swill Boilerplate Logo">
</p>

Boilerplate Front-End with [Gulp](http://gulpjs.com/), all you need to start multi-device development, easy to customize.

Visit the [website](http://tiagoporto.github.io/swill-boilerplate/).

## Table of Contents

* [Technologies](#technologies)
* [Includes](#includes)
* [Features](#features)
* [Folder Structure](#folder-structure)
* [Dependencies](#dependencies)
* [Boilerplate](#boilerplate)
	* [Usage](#usage)
	* [Tasks](#tasks)
	* [Config](#config)
	* [Bitmap Sprite](#bitmap-sprite)
	* [Vetor Sprite](#svg-sprite)
* [Contributing](#contributing)
* [License](#license)

## Technologies

This boilerplate uses the following technologies:

* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Bower](http://bower.io/)
* [BrowserSync](http://www.browsersync.io/)
* [CSSLint](http://csslint.net/)
* [EditorConfig](http://editorconfig.org/)
* [Gulp](http://gulpjs.com/)
* [ESLint](http://eslint.org/)
* [Jasmine](http://jasmine.github.io/)
* [Karma](http://karma-runner.github.io/0.13/index.html)
* [Node.js](http://nodejs.org/)
* [Sass](http://sass-lang.com/) or [Stylus](http://learnboost.github.io/stylus/)
* [NPM](https://www.npmjs.com/)

## Includes

* [Functions and mixins](http://tiagoporto.github.io/swill-boilerplate/functions-mixins.html) - CSS preprocessors
* [Google Analytics](http://www.google.com/analytics/)
* [jQuery Logo Downloadtip](http://tiagoporto.github.io/jquery-logo-downloadtip/) - Only if jQuery is used
* [Normalize.css](http://necolas.github.io/normalize.css/)
* [Outdated Browser](http://outdatedbrowser.com/)
* [Styles to Basic Components](http://tiagoporto.github.io/swill-boilerplate/components.html) - Only available with stylus

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
* Notify when tasks are complete
* Monitors changes in the files and reload browser with BrowserSync
* Javascript tests with Jasmine and Karma
* Build the project compressing HTML, CSS and JS.
* Push the `build` folder to gh-pages branch

## Folder Structure

```
./
├──┐
│  │
│  ├─ build // Folder with the builded project
│  │
│  ├─ public // Public files
│  │  ├─ css
│  │  │  └─ // Public styles
│  │  │
│  │  ├─ fonts
│  │  │  └─ // Web Fonts
│  │  │
│  │  ├─ img
│  │  │  │
│  │  │  ├─ copyright // Images with copyright metadata
│  │  │  │
│  │  │  ├─ logos // Logos
│  │  │  │
│  │  │  └─ // Public images
│  │  │
│  │  ├─ js
│  │  │  └─ // Public scripts
│  │  │
│  │  ├─ .htaccess // Configuration for use on web servers running the Apache Web Server
│  │  │
│  │  ├─ 404.html // Page to 404 error
│  │  │
│  │  ├─ apple-touch-icon.png // Icon for Safari on iOS
│  │  │
│  │  ├─ crossdomain.xml // Permission to handle data across multiple domains
│  │  │
│  │  ├─ favicon.ico //Icon for address bar and bookmark
│  │  │
│  │  ├─ index.html
│  │  │
│  │  ├─ manifest.json //Provides information about an Chrome app https://developer.chrome.com/extensions/manifest
│  │  │
│  │  ├─ manifest.webapp //Provides information about an Firefox OS app https://developer.mozilla.org/pt-BR/Apps/Manifest
│  │  │
│  │  ├─ robots.txt //Give instructions about their site to search engines
│  │  │
│  │  └─ // HTML, PHP, etc Files
│  │
│  ├─ spec // Scripts test
│  │
│  ├─ src // Source files for the projects
│  │    ├─ images // Original imagens, don't compressed
│  │    │  │
│  │    │  ├─ sprite // Images to generate the sprite
│  │    │  │
│  │    │  └─ touch // Icons
│  │    │  │   │
│  │    │  │   ├─ chrome-touch-icon-192x192.png // Icon for Chrome on Android
│  │    │  │   │
│  │    │  │   ├─ icon-128x128.png // Icon for Firefox on FirefoxOS
│  │    │  │   │
│  │    │  │   ├─ tile.png // Tile icon for Win8
│  │    │  │   │
│  │    │  │   └─ tile-wide.png // Wide tile icon for Win8
│  │    │  │
│  │    │  └─ // .jpg, .jpeg, .gif, .svg and .bmp to be compressed
│  │    │
│  │    ├─ scripts
│  │    │  │
│  │    │  ├─ settings
│  │    │  │  │
│  │    │  │  ├─ call_plugins.js // Call the plugins after page load
│  │    │  │  │
│  │    │  │  └─ google_analytics.js
│  │    │  │
│  │    │  └─ // Scripts
│  │    │
│  │    ├─ stylesheets
│  │    │    │
│  │    │    ├─ components
│  │    │    │
│  │    │    ├─ helpers
│  │    │    │  │
│  │    │    │  ├─ functions // All files here will be concatenated to ../functions.{sass, styl}
│  │    │    │  │
│  │    │    │  ├─ mixins // All files here will be concatenated to ../mixins.{sass, styl}
│  │    │    │  │
│  │    │    │  ├─ _functions.{sass, styl}
│  │    │    │  │
│  │    │    │  ├─ _helpers.{sass, styl} // Helper tips to preprocessor syntax
│  │    │    │  │
│  │    │    │  └─ _mixins.{sass, styl}
│  │    │    │
│  │    │    ├─ media_queries
│  │    │    │
│  │    │    ├─ settings
│  │    │    │  │
│  │    │    │  ├─ _placeholders.{sass, styl}
│  │    │    │  │
│  │    │    │  ├─ _variables.{sass, styl}
│  │    │    │  │
│  │    │    │  └─ _web-fonts.{sass, styl}
│  │    │    │
│  │    │    ├─ _base.{sass, styl} // Main Styles
│  │    │    │
│  │    │    └─ styles.{sass, styl} // Base file with imports
│  │    │
│  │    └─ header-comments.txt // Header to styles and Scripts
│  │
│  └─ Tasks // Specific Gulp tasks to preprocessors
│
├─ .bowerrc // Bower configuration file
├─ .csslintrc // CSSLint configuration file
├─ .editorconfig // Editorconfig configuration file
├─ .eslintrc // ESLint configuration file
├─ bower.json // Bower dependencies
├─ config.json // Swill configuration file
├─ gulpfile.js // Gulp file
├─ LICENSE.md // Swill License
├─ karma.conf.js // Karma configuration file
├─ package.json // NPM dependencies
└─ README.md // Documentation
```

## Dependencies

1. Install [EditorConfig](http://editorconfig.org/)

	* Download and install the [EditorConfig plugin](http://editorconfig.org/#download) for your text editor.

1. Download and install [Node.js](http://nodejs.org/download/)

	`Select npm package manager`

1. Install [Gulp](http://gulpjs.com/)

	* Open command line and execute

	```sh
	$ npm install -g gulp
	```

	For Mac or Linux User

	```sh
	$ sudo npm install -g gulp
	```

1. Install [Bower](http://bower.io/)

	* Execute

	```sh
	$ npm install -g bower
	```

1. __Necessary just to use with Sass.__

	1. In Windows is necessary install [Ruby](https://www.ruby-lang.org/)

		- Download and install [Ruby](http://rubyinstaller.org/).

	1. Install Gem [Sass](http://sass-lang.com/)

		- Open command line and execute

		```sh
		$ gem install sass
		```


## Boilerplate

* JavaScripts files in `src/scripts` named with `*_IGNORE.js` will be ignored and won't be published, named with `*_SEPARATE.js` won't be concatenated and will be generated separated.
	- Example
	`myplugin_SEPARATE.js` will be published as `myplugin.js`.

* The folder `public/img` is clean when some tasks are executed, the images come from ` src/images`, but if you work with copyrighted images you shouldn't use compression, because it removes the metadatas from files. You can place images direct in the `public/img/copyright`, they won't be deleted.

	> If for some other reason you want to use other folders directly in the `public/img`, add the folder in the task ` clean` on `gulpfile.js`, and it won't be deleted.


### Usage

1. Open the file [`config.json`](#config) and setting as needed.
	* In the browserSyncConfig if you will use dinamic files, it's necessary replace the server option by proxy.
	* Example

	```json
	"browserSyncConfig": {
		"notify": false,
		"logPrefix": "BrowserSync",
		"server": {
			"baseDir": ["src/", "public/", "bower_components/"]
		}
	}
	```

	```json
	"browserSyncConfig": {
		"notify": false,
		"logPrefix": "BrowserSync",
		"proxy": "localhost/swill-boilerplate/public/"
	}
	```

1. Open the files `.csslintrc`, `.editorconfig`, and `.eslintrc` and set your configs to CSSLint, EditorConfig and ESLint respectively.

1. Make a search in the folder project by `{Title}` and `{-}`, and replace by the corrected informations.

1. Open the file `src/header-comments.txt` and set your project header.

1. Open the terminal and go to the local folder

	```sh
	$ cd {your-folder-structure}/swill-boilerplate
	```

1. Install [NPM](https://www.npmjs.com/) dependencies

	* Execute

	```sh
	$ npm install
	```

1. Set the CSS preprocessor you will use, execute only once (execute this after install bower dependencies)

	```sh
	$gulp setup --sass|stylus
	```

1. At the first time run the task `gulp` with parameter `compile` and start the development

	```sh
	$ gulp --compile
	```


### Tasks

**Default Task** - serve the project and watch (Alias to `gulp serve`)

```sh
$ gulp
```

**Default Task** (the default task accepts the parameter --compile) - clean assets, compile, watch and serve the project.

```sh
$ gulp --compile
```

**Compile Task** - clean assets and compile the project.

```sh
$ gulp compile
```

**Build Task** - build the project

```sh
$ gulp build
```

**Build Task** (the build task accepts the parameter --serve) - build the project and serve builded project.

```sh
$ gulp build --serve
```

**Gh-pages Task** - build the project and push the builded folder to gh-pages branch

```sh
$ gulp ghpages
```


### Config

All the setting find in `config.json`

#### basePaths

Type: `Object`

Application paths.


#### components

Type: `Boolean`

to-do

#### outdatedBrowser

Type: `Boolean`

If use outdatedBrowser.

#### logodownloadtip

Type: `Boolean`

If use jQuery Logo Downloadtip.

#### jquery

Type: `Boolean`

If use jQuery.


#### lintCSS

Type: `Boolean`

If use lint CSS.

#### lintJS

Type: `Boolean`

If use lint JS.

#### autoprefixerBrowsers

Type: `Array`

Autprefixer option, see the autoprefixer [docs](https://github.com/postcss/autoprefixer#options).

#### browserSync

Type: `Object`

BrowserSync options, see the browsersync [docs](https://www.browsersync.io/docs/options/).

#### browserSyncBuild

Type: `Object`

BrowserSync options to builded project, see the browsersync [docs](https://www.browsersync.io/docs/options/).


### Bitmap Sprite

This boilerplate uses [gulp.spritesmith](https://www.npmjs.org/package/gulp.spritesmith) to generate bitmap sprites.

When the sprite is generated, a file `_bitmap-sprite.{styl,scss}` is created with four mixins and the variables of the parameters of the images, like height and width (the names of the variables is the same of the original filename before the compilation).

Just use the mixins with the variables as parameters.

**Example**

```styl
#arrow
	sprite($left_arrow)

	&:hover
		spritePosition($right_arrow)
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

### Vetor Sprite

To generate SVG sprites is used [gulp-svg-sprite](https://github.com/jkphl/gulp-svg-sprite), as fallback all the SVG sprites are converted to `.png` with [gulp-svg2png](https://github.com/akoenig/gulp-svg2png)

* Put the icon in `src/images/sprite`.
* In HTML put the class in elements

	```html
	<i class="svg-icon-dims svg-icon"><i>
	```

	The class `-dims` get the dimensions and the other the position of the icon in sprite.

	The classname is defined by the `.svg` filename, example:

	* `moon.svg` the classname use the prefix `svg-` and the filename of the svg `moon`.
	* If you want use a hover, just name the file, `moon~hover.svg` and use the class `sgv-moon`.



## Contributing

If you have time to contribute, giving some suggestions, improving the documentation, correcting bugs or anything else, please help me to make this a good tool for everyone.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

Swill Boilerplate is released under the terms of the [MIT license](http://opensource.org/licenses/MIT).