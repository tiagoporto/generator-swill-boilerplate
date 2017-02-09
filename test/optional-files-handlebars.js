var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var files = require('./files.json')

describe('generator-swill-boilerplate:app', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [
          'readme',
          'contributing',
          'changelog',
          '404',
          'travis',
          'npmignore',
          'htaccess',
          'crossdomain',
          'manifestJson',
          'manifestWebapp',
          'browserconfig',
          'robots',
          'humans'
        ],
        handlebars: false,
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Base settings with all optional files without handlebars', function () {
    yoAssert.file(
      files.base.concat(files.stylus, files.optionals, files.handlebars.disabled['404'])
    )
  })
})
