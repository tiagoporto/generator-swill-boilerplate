# Gulp Template

Basic Template Front-end with [Gulp](http://gulpjs.com/)

Page [Gulp Template](http://tiagoporto.github.io/gulp-template/).

This template includes

* [Sass](http://sass-lang.com/) + [Compass](http://compass-style.org/)
* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [Jquery Mobile](http://jquerymobile.com/)
* [Bootstrap](http://getbootstrap.com/)
* [AngularJS](http://angularjs.org/)

Just remove what you will not use or include in specific directories: libraries, frameworks or plugins which you want use.

## Features

* Compress Images
* Compile Sass
* Minify JavaScript
* Monitors changes in the file with LiveReload - reload browser
* Clean the assets (img, css, js) in the project to maintain the directory organized
* Notify when tasks are complete

## Directories Structures

```
./
├───┐
│   ├── .sass-cache
│   │   └─ //SASS Cache
│   │
│   ├── node-modules //Will appear after installed the NPM modules
│   │   └─ //All Gulp.js plugins
│   │
│   ├── project //Files for deployment
│   │   ├─ css
│   │   │  └─ //CSS used by the project
│   │   │
│   │   ├─ fonts
│   │   │  └─ //Web Fonts used by the project
│   │   │
│   │   ├─ img
│   │   │  └─ //Images used by the project
│   │   │
│   │   ├─ js
│   │   │  └─ //Scripts used by the project
│   │   │
│   │   ├─ //Favicons Files
│   │   │
│   │   └─ //HTML Files
│   │
│   │
│   └── src //Source files for the projects
│       ├── images
│       │   └─ //Original imagens, don't compressed
│       │
│       ├── scripts
│       │   ├─ frameworks
│       │   │
│       │   ├─ libs
│       │   │
│       │   ├─ onread
│       │   │
│       │   ├─ plugins
│       │   │
│       │   └─ //Javascript files will be concatenated and minify
│       │
│       └── stylesheets
│           │
│           ├─ bootstrap
│           │
│           ├─ media_queries
│           │
│           └─ //SASS files be concatenated and minify
│
│
├── .gitignore //Ignored files to GIT commit
├── gulpfile.js //Gulp.js configuration file
├── package.json //NPM dependencies
├── README.md //Descrition of project
└── config.rb //Additional configurations for the SASS
```


## Dependencies


1. [Node.js](http://nodejs.org/) installation

  `Mark npm package manager`


1. Install Gulp

  ```
  $ npm install -g gulp
  ```

  For Mac or Linux User

  ```
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


```
$ gem update --system
$ gem install compass
```

Go to the local folder

```
$ cd local/gulp-template
```


Install dependences of npm
```
$ npm install
```


## Usage

Go to the local folder

```
$ cd local/template-gulp
```

Execute

```
$ gulp
```

## Bugs

[Error: ENOENT, no such file or directory](https://github.com/appleboy/gulp-compass/issues/15)

```
sudo gem uninstall sass
sudo gem install sass -v 3.2.12
```