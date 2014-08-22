# My Gulp.js Template

![gulp.js Logo](https://raw2.github.com/gulpjs/artwork/master/gulp.png)

Basic Template Front-End with [Gulp.js](http://gulpjs.com/)

Current version - **1.3.1**

<!-- Example [Gulp Template](http://tiagoporto.github.io/my-gulp-template/). -->

This template includes files and configs from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

Uses the following technologies:

* [Gulp.js](http://gulpjs.com/)
* [Ruby](https://www.ruby-lang.org/)
* [Sass](http://sass-lang.com/) + [Compass](http://compass-style.org/)
* [LiveReload](http://livereload.com/)

## Features

* Compress Images
* Compile Sass
* Minify JavaScript
* Monitors changes in the files and reload browser with LiveReload
* Clean the assets (img, css, js) in the project to maintain the directory organized
* Notify when tasks are complete
* Checks if the browser is outdated with [Outdated Browser](http://outdatedbrowser.com/)

## Include

* [AngularJS](http://angularjs.org/)
* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [Jquery Mobile](http://jquerymobile.com/)
* [Underscore.js](http://underscorejs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Outdated Browser](http://outdatedbrowser.com/)
* [Animate.css](https://github.com/daneden/animate.css)

Just remove what you will not use or include in specific directories: libraries, frameworks or plugins which you want use in scripts and stylesheets folders.
Remember to remove dependencies styles in `src/styles.sass`.


## Folder Structure

```
./
├───┐
│   ├── .sass-cache
│   │   └─ //SASS Cache
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
│   │   ├─ img
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
│   │   ├─ //Favicons Files
│   │   │
│   │   └─ //HTML or PHP Files
│   │
│   │
│   └── src //Source files for the projects
│       ├── images
│       │   └─ //Original imagens, don't compressed
│       │
│       ├── scripts
│       │   │
│       │   ├─ angular_scripts //Development AngularJS scripts
│       │   │
│       │   ├─ frameworks
│       │   │
│       │   ├─ libs
│       │   │
│       │   ├─ main //Development Javascript files will be concatenated and minify
│       │   │
│       │   ├─ onread //Open and close elements of Jquery
│       │   │
│       │   ├─ plugins
│       │   │
│       │   └─ settings //Necessary settings to setup plugins, etc.
│       │
│       └── stylesheets
│           │
│           ├─ additional //Styles used by external plugins
│           │
│           ├─ helpers
│           │
│           ├─ main //Main Styles
│           │
│           ├─ media_queries
│           │
│           ├─ typography
│           │
│           └─ styles.sass //Base SASS file
│
│
├── .gitignore //Ignored files to GIT commit
├── config.rb //Additional configurations for the SASS
├── gulpfile.js //Gulp.js configuration file
├── package.json //NPM dependencies
└── README.md //Descrition of project
```

## Dependencies

1. [Node.js](http://nodejs.org/) installation

  `Mark npm package manager`


1. Install Gulp.js

  ```sh
  $ npm install gulp -g
  ```

  For Mac or Linux User

  ```sh
  $ sudo npm install gulp -g
  ```


1. [gulp-compass](https://www.npmjs.org/package/gulp-compass) require ruby and compass

  For Windows Users Only is necessary installer ruby

  Download [Ruby](https://www.ruby-lang.org/pt/)

  Download Development Kit from [Ruby Installer](http://rubyinstaller.org/downloads/)

  * Unzip the zip
  * Open command-line and go to unzipped folder
  * `ruby dk.rb init`
  * `ruby dk.rb install`
  * `gem install rdiscount --platform=ruby`


```sh
$ gem update --system
$ gem install compass
```

Go to the local folder
```sh
$ cd my-gulp-template
```


Install dependences of npm
```sh
$ npm install
```

### Recommendations

Compass generates PNG files using a pure-ruby library called `chunky_png`. This library can be made faster by installing a simple C extension called `oily_png`.

[http://compass-style.org/help/tutorials/spriting/](http://compass-style.org/help/tutorials/spriting/)

```sh
$ sudo gem install oily_png
```


## Usage

Go to the local folder

```sh
$ cd my-gulp-template
```

Execute

```sh
$ gulp
```

For best performance on optimize images, set just the current image folder on variable `current_path_images` in `gulpfile.js`

```js
var curent_path_images = "/", //Set the root source images

var curent_path_images = "subfolder/", //Set especific subfolder in folder of source images
```

If you want chance the name of folders just change the path variables in `gulpfile.js` and `config.rb`.

If you want change the filename of the sprite its necessary change the variable `sprite_path` in `gulpfile.js`.


## Bugs

[Error: ENOENT, no such file or directory](https://github.com/appleboy/gulp-compass/issues/15)

```sh
$ sudo gem uninstall sass
$ sudo gem install sass -v 3.2.12
```

Sass Multiline comments don`t work

Example
```
/*
	Multiline
	Comment
*/
```

Sass @debug don`t work

Example
```
	@debug 10em + 12em
```
Sass Map structures don`t work

Example
```
$list:
	(1,  "value"),
	(5,  "value"),
	(23, "value")
```
