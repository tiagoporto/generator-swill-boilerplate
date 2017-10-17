var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var files = require('./files.json')

describe('Base with Stylus without handlebars', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        handlebars: false,
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Base settings with Stylus without handlebars', function () {
    yoAssert.file(
      files.base.concat(files.stylus, files.handlebars.disabled.all)
    )
  })
})
