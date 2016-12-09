/* eslint-env node */

var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    prompting: function() {
        this.composeWith('swill-boilerplate:style', {});

        var prompts = [{
            name: 'folder',
            required: true,
            message: 'Folder and file path'
        }];

        return this.prompt(prompts).then(function(props) {
            this.props = props;
        }.bind(this));
    },

    writing: function() {
        var config = require(this.destinationPath('config.json'));

        this.fs.write(this.destinationPath(config.basePaths.styles.src + this.props.folder), '');
    }
});
