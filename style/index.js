'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    this.composeWith('swill-boilerplate:style', {});

    var prompts = [{
      name: 'folder',
      required: true,
      message: 'Folder and file path'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: function () {
    console.log(this.props.folder);

    var config = require(this.destinationPath('config.json'));

    this.fs.write(this.destinationPath(config.basePaths.styles.src + this.props.folder), '');
  }
});
