'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-swill-boilerplate:app', function () {
  // before(function (done) {
  //   helpers.run(path.join(__dirname, '../app'))
  //     .withOptions({preprocessor: 'stylus'})
  //     .on('end', done);
  // });

  it('creates files', function () {
    assert.file([
      'package.json'
    ]);
  });
});
