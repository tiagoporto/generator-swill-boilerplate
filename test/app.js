var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')

describe('generator-swill-boilerplate:app', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        'preprocessor': 'stylus',
        features: [],
        options: [],
        files: [],
        license: 'nolicense'
      })
      .toPromise()
  })

  it('creates files', function () {
    yoAssert.file([
      '.csslintrc',
      '.editorconfig',
      '.eslintrc',
      '.yo-rc.json',
      'app/favicon.ico',
      'config.json',
      'gulpfile.js',
      'package.json',
      'src/header-comments.txt'
    ])
  })
})
