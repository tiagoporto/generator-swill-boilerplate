/* eslint-env node */

var Yeoman = require('yeoman-generator')
var path = require('path')
var fs = require('fs')

module.exports = class extends Yeoman {
  prompting () {
    var prompts = [{
      name: 'filename',
      required: true,
      message: 'Filename'
    }]

    return this.prompt(prompts).then(function (props) {
      this.prompts = props
      this.props = {
        'filename': props.filename
      }

    }.bind(this))
  }

  writing () {
    var config = require(this.destinationPath('config.json'))
    var extension = require(this.destinationPath('.yo-rc.json'))
    extension = (extension.preprocessor === 'sass') ? 'scss' : 'styl'
    var savefile = path.join(config.basePaths.src, config.basePaths.styles.src, `components/_${this.props.filename}.${extension}`)
    var index = fs.readFileSync(this.destinationPath(path.join(config.basePaths.src, config.basePaths.styles.src, `components/_index.${extension}`)), 'utf8')
    console.log("index", index)

    this.fs.write(this.destinationPath(savefile), '')
  }
}
