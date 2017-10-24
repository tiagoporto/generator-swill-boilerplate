var yoAssert = require('yeoman-assert')
var yoTest = require('yeoman-test')
var path = require('path')
var fs = require('fs')

describe('Package.json File', () => {
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

  it('Clean', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'clean.json'), 'utf-8'))
  })
})

describe('Package.json File', function () {
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
        integrations: ['coveralls'],
        license: 'unlicense'
      })
      .toPromise()
  })

  it('Coveralls', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'coveralls.json'), 'utf-8'))
  })
})

describe('Package.json File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [
          'prepush',
          'precommit'
        ],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  xit('Githook', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'githooks.json'), 'utf-8'))
  })
})
