<!-- http://keepachangelog.com/ -->
# Swill Boilerplate Generator

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.6.0beta] - 2016-xx-xx
### Added
- Config to clean paths
- Option to .travis.yml file

### Fixed
- Title in handlebars

### Changed
- karma-chrome-launcher to karma-phantomjs-launcher
- Turned off sort-vars eslint

### Removed
- Background from <body> in `styl` files

## [0.5.0beta] - 2016-10-16
### Fixed
- Set Author url in `package.json`
- Set footer readme project name

### Added
- Set Keywords
- Set description and keywords in `index.html`
- Get Author name and email by git
- Option to set default project language

## [0.4.0beta] - 2016-10-03
### Added
- `bower.json` Optional
- Set boilerplate version on `gulpfile.js`

### Changed
- Moved bower to npm
- Updated dependencies

## [0.3.0beta] - 2016-10-01
### Added
- Class with display block svg sprite
- Set jQuery option in `.eslintrc`

### Changed
- Fixed use of es6

### Fixed
- Removed hard coded option font-path and image-path in stylesheets
- Copy lang folder of outdated-browser

## [0.2.7beta] - 2016-09-18
### Changed
- Fixed boilerplate dependencies

### Fixed
- Set lint and ES6 options
- Lint errors boilerplate `gulpfile.js`
- Links color in Stylus

### Added
- Language option in Handlebars

## [0.2.6beta] - 2016-09-10
### Changed
- Lint Rules
- Update packages

### Fixed
- Slug name in package.json
- Keep necessary folders with `.gitkeep`
- Keep `favicon.ico` and `apple-touch-icon.png`
- Optional 404
- Include humans and icons link in HTML

### Added
- Option to rename handlebars folder

## [0.2.5beta] - 2016-08-31
### Added
- Check if the folder name is equal to project name, if not the boilerplate will be created inside the project name

### Fixed
- Styles and scripts link on HTML
- REM Function in Sass

### Changed
- Updated jQuery dependency

## [0.2.4beta] - 2016-08-13
### Fixed
- Compile SASS

### Changed
- Rename all `.sass` files to `.scss`

## [0.2.3beta] - 2016-07-27
### Fixed
- Ignored NPM files

## [0.2.2beta] - 2016-07-26
### Fixed
- Lint Test

### Added
- `.npmignore` to cancel ignored files in npm

## [0.2.1beta] - 2016-07-10
### Changed
- Refactored `index.js`

### Fixed
- Organized YO saved settings
- Options to generate `scripts/settings/call_plugins.js`
- Env build task `swill boilerplate`

## [0.2.0beta] - 2016-07-03
### Added
- Save settings.
- Handlebars template.

### Fixed
- Bower settings.

## [0.1.0beta] - 2016-02-27
- Initial release, implemented [Swil Boilerplate](https://github.com/tiagoporto/swill-boilerplate) in generator