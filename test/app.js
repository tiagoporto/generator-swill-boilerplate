/* eslint-env node, mocha */
/* eslint strict: ["error", "global"] */
'use strict';
var assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    path = require('path');

describe('generator-swill-boilerplate:app', function() {
    before(function() {
        return helpers.run(path.join(__dirname, '../app'))
            .withPrompts({
                features: [],
                options: [],
                files: [],
                license: {
                    license: 'nolicense'
                }
            })
            .toPromise();
    });

    it('creates files', function() {
        assert.file([
            'package.json'
        ]);
    });
});
