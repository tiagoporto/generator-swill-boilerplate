var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var fs = require('fs')

describe('Travis File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Without Travis', function () {
    yoAssert.noFile('.travis.yml')
  })
})

describe('Travis File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [],
        integrations: [
          'travis',
          'coveralls'
        ],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('With Coveralls', function () {
    yoAssert.fileContent('.travis.yml', fs.readFileSync(path.resolve(__dirname, 'coveralls.txt'), 'utf-8'))
  })
})

describe('Travis File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [
          'readme'
        ],
        handlebars: false,
        gitHooks: [],
        integrations: [
          'travis'
        ],
        license: 'unlicense'
      })
  })

  it('With Readme', function () {
    yoAssert.fileContent('.travis.yml', fs.readFileSync(path.resolve(__dirname, 'readme.txt'), 'utf-8'))
  })
})

describe('Travis File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [
          'readme'
        ],
        handlebars: false,
        gitHooks: [],
        integrations: [
          'travis',
          'coveralls'
        ],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('With Readme and coveralls', function () {
    yoAssert.fileContent('.travis.yml', fs.readFileSync(path.resolve(__dirname, 'readme.txt'), 'utf-8'))
  })
})
