# My Gulp.js Template

![gulp.js Logo](https://raw2.github.com/gulpjs/artwork/master/gulp.png)

Basic Template Front-End with [Gulp.js](http://gulpjs.com/)

Current version - **2.0.0beta**

I started this template when I start working with Gulp.js. When the google launch the [Web Starter Kit](https://developers.google.com/web/starter-kit/). I saw that I'm on the right track.

Uses the following technologies:

* [BrowserSync](http://www.browsersync.io/)
* [EditorConfig](http://editorconfig.org/)
* [Gulp.js](http://gulpjs.com/)
* [JSHint](http://www.jshint.com/)
* [Node.js](http://nodejs.org/)
* [Ruby](https://www.ruby-lang.org/)
* [Sass](http://sass-lang.com/)

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
├───┐
│   ├── .sass-cache
│   │   └─ //SASS Cache
│   │
│   ├── build //Folder with the build project
│   │
│   ├── node-modules //Will appear after installed the NPM modules
│   │   └─ //All Gulp.js plugins
│   │
│   ├── public //Files for deployment
│   │   ├─ css
│   │   │  └─ //CSS public css
│   │   │
│   │   ├─ fonts
│   │   │  └─ //Web Fonts
│   │   │
│   │   ├─ images
│   │   │  └─ //public images
│   │   │
│   │   ├─ js
│   │   │  └─ //public scripts
│   │   │
│   │   ├─ lang
│   │   │  │
│   │   │  ├─ outdated_browser //langs to outdated browser plugin
│   │   │  │
│   │   │  └─ //langs to multilingue sites
│   │   │
│   │   ├─ .htaccess
│   │   │
│   │   ├─ crossdomain.xml
│   │   │
│   │   ├─ manifest.webapp
│   │   │
│   │   ├─ robots.txt
│   │   │
│   │   ├─ //Favicons Files
│   │   │
│   │   └─ //HTML or PHP Files
│   │
│   └── src //Source files for the projects
│       ├── images //Original imagens, don't compressed
│       │   │
│       │   ├─ sprite //Images to generate the sprite
│       │   │
│       │   └─ touch //Icons to Mobile
│       │
│       ├── scripts
│       │   │
│       │   ├─ angular //Development AngularJS
│       │   │
│       │   ├─ dependencies
│       │   │  │
│       │   │  ├─ frameworks
│       │   │  │
│       │   │  ├─ libs
│       │   │  │
│       │   │  └─ plugins
│       │   │
│       │   ├─ jquery
│       │   │  │
│       │   │  ├─ onread //Open and close elements of Jquery
│       │   │  │
│       │   │  └─ //Development JQuery
│       │   │
│       │   ├─ settings //Necessary settings to setup plugins, etc.
│       │   │
│       │   └─ //Development Javascript files will be concatenated and minify
│       │
│       └── stylesheets
│           │
│           ├─ dependencies //Styles used by external plugins
│           │
│           ├─ helpers
│           │  │
│           │  ├─ mixins
│           │  │
│           │  ├─ _functions.sass
│           │  │
│           │  ├─ _mixins.sass
│           │  │
│           │  └─ _variables.sass
│           │
│           ├─ media_queries
│           │
│           ├─ typography
│           │
│           ├─ _base.sass //Main Styles
│           │
│           ├─ _normalize-x-x-x.sass //Normalize
│           │
│           ├─ _sprite.sass //Generated class with use sprite
│           │
│           └─ styles.sass //Base SASS with imports
│
├── .editorconfig //Settings of editorconfig plugin
├── .jshintrc //JSHint configuration file
├── gulpfile.js //Gulp.js configuration file
├── package.json //NPM dependencies
└── README.md //Descrition of template
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
$ cd my-gulp-template
```

Install dependences of npm
```sh
$ npm install
```

## Usage

Go to the local folder

```sh
$ cd my-gulp-template
```

Execute to development

```sh
$ gulp
```

Execute to build the project

```sh
$ gulp build
```

If you will work with dinamic files like .php its necessary make changes in gulpfile.js to BrowserSync

Remove the lines
```
server: {
	baseDir: [basePaths.src, basePaths.dest]
}
```
Set the url to the server
```
proxy: "localhost/my-gulp-template/public/"
```
