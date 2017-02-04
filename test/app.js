var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var path = require('path')

describe('generator-swill-boilerplate:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        features: [],
        options: [],
        files: [],
        license: { license: 'nolicense' }
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
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
