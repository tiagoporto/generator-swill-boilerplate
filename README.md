# Swill Boilerplate

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
* [Usage](#usage)
	* [Config](#config)
	* [Tasks](#tasks)
	* [Peculiarities](#peculiarities)
	* [BrowserSync](#browsersync)
	* [Bitmap Sprite](#bitmap-sprite)
	* [Vetor Sprite](#svg-sprite)
* [Contributing](#contributing)
* [License](#license)

## Technologies

Uses the following technologies:

* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Bower](http://bower.io/)
* [BrowserSync](http://www.browsersync.io/)
* [CSSLint](http://csslint.net/)
* [EditorConfig](http://editorconfig.org/)
* [Gulp](http://gulpjs.com/)
* [JSHint](http://www.jshint.com/)
* [Node.js](http://nodejs.org/)
* [NPM](https://www.npmjs.com/)
* [Less](http://lesscss.org/), [Sass](http://sass-lang.com/) or [Stylus](http://learnboost.github.io/stylus/)

## Includes

* [Animate.css](http://daneden.github.io/animate.css/)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
* [Google Analytics](http://www.google.com/analytics/)
* [Jeet](http://jeet.gs/)
* [jQuery](http://jquery.com/)
* [Normalize.css](http://necolas.github.io/normalize.css/)
* [Outdated Browser](http://outdatedbrowser.com/)
* [Twitter Bootstrap](http://getbootstrap.com/)

## Features

* Clean the assets (images, css, js) in the project to maintain the directory organized
* Compress Images
* Generate Sprites with .png
* Generate Sprites with .svg and a fallback .png
* Analyze CSS with csslint
* Concatenate And Minify Scripts
* Analyze JavaScript with jshint
* Compile Less, Sass or Stylus
* Catch the Stylus error and direct shows on the page, as in Sass.
* Functions and mixins to use with Sass or Stylus
* Notify when tasks are complete
* Monitors changes in the files and reload browser with [BrowserSync](http://www.browsersync.io/)
* Configs from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
* Check if the browser is outdated with [Outdated Browser](http://outdatedbrowser.com/)
* Build the project compressing HTML, CSS and JS.


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
│  │  ├─ lang
│  │  │  ├─ outdated_browser // Langs to outdated browser plugin
│  │  │  │
│  │  │  │
│  │  │  └─ // Langs to multilingue sites
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
│  └─ src // Source files for the projects
│       ├─ images // Original imagens, don't compressed
│       │  │
│       │  ├─ sprite // Images to generate the sprite
│       │  │
│       │  └─ touch // Icons
│       │  │   │
│       │  │   ├─ chrome-touch-icon-192x192.png // Icon for Chrome on Android
│       │  │   │
│       │  │   ├─ icon-128x128.png // Icon for Firefox on FirefoxOS
│       │  │   │
│       │  │   ├─ tile.png // Tile icon for Win8
│       │  │   │
│       │  │   └─ tile-wide.png // Wide tile icon for Win8
│       │  │
│       │  └─ // .jpg, .jpeg, .gif, .svg and .bmp to be compressed
│       │
│       ├─ scripts
│       │  │
│       │  ├─ dependencies // External plugins
│       │  │
│       │  ├─ settings
│       │  │  │
│       │  │  ├─ call_plugins.js // Call the plugins after page load
│       │  │  │
│       │  │  └─ google_analytics.js // Settings to Analytics
│       │  │
│       │  └─ // Scripts
│       │
│       └─ stylesheets
│       │    │
│       │    ├─ components
│       │    │
│       │    ├─ dependencies //Styles used by external plugins
│       │    │
│       │    ├─ helpers
│       │    │  │
│       │    │  ├─ functions
│       │    │  │
│       │    │  ├─ mixins
│       │    │  │
│       │    │  ├─ _bitmap-sprite.{sass, styl, less}
│       │    │  │
│       │    │  ├─ _functions.{sass, styl}
│       │    │  │
│       │    │  ├─ _helpers.{sass, styl}
│       │    │  │
│       │    │  ├─ _mixins.{sass, styl}
│       │    │  │
│       │    │  ├─ _placeholders.{sass, styl}
│       │    │  │
│       │    │  ├─ _variables.{sass, styl, less}
│       │    │  │
│       │    │  └─ _vetor-sprite.{sass, styl, less}
│       │    │
│       │    ├─ media_queries
│       │    │
│       │    ├─ typography
│       │    │
│       │    ├─ _base.{sass, styl, less} // Main Styles
│       │    │
│       │    └─ styles.{sass, styl, less} // Base file with imports
│       │
│       └─ header-comments.txt
│
├─ .editorconfig // Settings of editorconfig plugin
├─ .jshintrc // JSHint configuration file
├─ bower.json // Bower dependencies
├─ gulpfile.js // Gulp configuration file
├─ package.json // NPM dependencies
└─ README.md // Documentation
```

## Dependencies

1. Install [EditorConfig](http://editorconfig.org/)

	* Download and install the [EditorConfig plugin](http://editorconfig.org/#download) for you text editor.

1. Download and install [Node.js](http://nodejs.org/download/)

	`Select npm package manager`

1. Install [Gulp](http://gulpjs.com/)

	* Open command line and execute

	```sh
	$ npm install gulp -g
	```

	For Mac or Linux User

	```sh
	$ sudo npm install gulp -g
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


## Usage

### Config

1. Open the file `config.json` to setting config.
	* If change the directory `basePaths.images.dest`, remember to modify the variable $image-path in 'src/stylesheets/helpers/_variables'.
	* In the browserSyncConfig if you will use dinamic files, its necessary replace the server option by proxy.
	* Example
```json
"browserSyncConfig": {
	"notify": false,
	"port": 80,
	"logPrefix": "BrowserSync",
	"server": {
		"baseDir": ["src/", "public/", "bower_components/"]
	}
}
```

```json
"browserSyncConfig": {
	"notify": false,
	"port": 80,
	"logPrefix": "BrowserSync",
	"proxy": "localhost/swill-boilerplate/public/"
}
```

1. Open the file `bower.json`
	* Remove the dependencies that you will not use.



### Start

1. Open the terminal and go to the local folder

	```sh
	$ cd {yourFolderStructure}/swill-boilerplate
	```

1. Install [NPM](https://www.npmjs.com/) dependencies

	* Execute

	```sh
	$ npm install
	```


1. Install [Bower](http://bower.io/) Dependencies
	* Execute

	```sh
	$ bower install
	```

1. Set the CSS preprocessor you will use, necessary just once

```sh
$gulp setup --preprocessor sass|less|stylus
```

1. Execute the task `gulp` to start the development

```sh
$ gulp
```


### Tasks

**Default Task** - compile the project

```sh
$ gulp
```

**Compile, watch and serve**

The default task accept the parameter --serve.

```sh
$ gulp --serve
```

**Serve Task** - serve the project and watch.

```sh
$ gulp serve
```

**Build Task**

```sh
$ gulp build
```

**Build And Serve**

The build task accept the parameter --serve.

```sh
$ gulp build --serve
```

### Peculiarities

* Js Files prefixed with `_` won't be concatenated.

* The folder `public/img` is clean when the task is run, and the images are compressed and come from ` src/images`, but if you work with copyrighted images you should not use compression, because it removes the metadatas from files. You can place images direct in the `public/img/copyright`, they won't be deleted.

	> If for some other reason you want to use other folders directly in the `public/img`, add the folder in the task ` clean` on `gulpfile.js`, and it won't be deleted.

* To use bower components just link the file on the HTML inside of the especifics comments. This way all the files will be concatenated and minified to build.

**Example**

```html
	<!-- build:js js/scripts.combined.min.js -->
	<script src="angular/angular.js"></script>
	<script src="jquery/dist/jquery.js"></script>
	<script src="bootstrap/dist/js/bootstrap.js"></script>
	<!-- endbuild -->
```

*The link to file start inside of the `bower_components`, the application won't work out of the serve.*


### BrowserSync

If you will work with dinamic files like .php, it's necessary make changes in `gulpfile.js` to BrowserSync works

Remove the lines
```javascript
server: {
	baseDir: [basePaths.src, basePaths.dest]
}
```
Set the url server
```javascript
proxy: "localhost/swill-boilerplate/public/"
```

### Bitmap Sprite

This boilerplate uses [gulp.spritesmith](https://www.npmjs.org/package/gulp.spritesmith) to generate bitmap sprites.

When the sprite is generated, a file `_bitmap-sprite.{styl,scss,less}` is created with four mixins and the variables of the parameters of the images, like height and width (the names of the variables is the same of the original filename before the compilation).

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

## License

Swill Boilerplate is released under the terms of the [MIT license](http://opensource.org/licenses/MIT).