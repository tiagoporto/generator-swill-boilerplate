var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var files = require('./files.json')

describe('Base with Sass', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        preprocessor: 'sass',
        features: [],
        options: [],
        files: [],
        gitHooks: [],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Base settings with Sass', function () {
    yoAssert.file(
      files.base.concat(files.sass, files.handlebars.enabled.all)
    )
  })
})
