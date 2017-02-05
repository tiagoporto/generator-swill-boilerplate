var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var files = require('./files.json')

describe('generator-swill-boilerplate:app Stylus', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Base settings with Stylus', function () {
    yoAssert.file(
      files.base.concat(files.stylus)
    )
  })
})
