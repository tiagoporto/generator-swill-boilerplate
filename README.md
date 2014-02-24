# Gulp Template

Basic Template to start using [Gulp](http://gulpjs.com/)

This template includes

1. [Sass](http://sass-lang.com/) + [Compass](http://compass-style.org/)
2. Js


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
  * Open command-line and go to unzipperd folder
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