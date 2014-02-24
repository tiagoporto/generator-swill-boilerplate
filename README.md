# Gulp Template

Basic Template to start using [Gulp](http://gulpjs.com/)


## Dependencies


[node.js](http://nodejs.org/) installation
Enable npm Package manager


Install Gulp

```
$ npm install -g gulp
```


Go to the folder

```
$ cd local/template-gulp
```


Install dependences of npm
```
$ npm install
```


`gulp-compass` require ruby and compass

For Windows

Download [Ruby](https://www.ruby-lang.org/pt/)

Download Development Kit from here http://rubyinstaller.org/downloads/

DevKit url at this time : https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe

Follow instructions here : https://github.com/oneclick/rubyinstaller/wiki/development-kit

Or short instructions :

    Unzip the zip

    open command-line and go to unzipperd folder

    ruby dk.rb init

    ruby dk.rb install

    gem install rdiscount --platform=ruby



```
$ gem update --system
$ gem install compass
```

## Usage

```
$ gulp
```

## Bugs

Error: ENOENT, no such file or directory

``
sudo gem uninstall sass
sudo gem install sass -v 3.2.12
```