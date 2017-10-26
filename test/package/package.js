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

  it('Stylus', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'stylus.json'), 'utf-8'))
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

  xit('Coveralls', function () {
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

describe('Package.json File', function () {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [],
        options: [],
        files: [],
        handlebars: true,
        gitHooks: [],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  xit('Handlebars', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'handlebars.json'), 'utf-8'))
  })
})

describe('Package.json File', () => {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'sass',
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

  xit('Sass', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'sass.json'), 'utf-8'))
  })
})

describe('Package.json File', () => {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [
          'jquery',
          'normalize',
          'outdatedBrowser'
        ],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  xit('Optionals Libs', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'libs.json'), 'utf-8'))
  })
})

describe('Package.json File', () => {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [
          'jquery'
        ],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [],
        integrations: [],
        jqueryLogoDownloadtip: true,
        license: 'unlicense'
      })
      .toPromise()
  })

  xit('jqueryLogoDownloadtip', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'jqueryLogoDownloadtip.json'), 'utf-8'))
  })
})

describe('Package.json File', () => {
  before(function () {
    return yoTest
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        preprocessor: 'stylus',
        features: [
          'outdatedBrowser'
        ],
        options: [],
        files: [],
        handlebars: false,
        gitHooks: [],
        integrations: [],
        license: 'unlicense'
      })
      .toPromise()
  })

  xit('Outdatedbrowser', function () {
    yoAssert.equalsFileContent('package.json', fs.readFileSync(path.resolve(__dirname, 'outdatedbrowser.json'), 'utf-8'))
  })
})
