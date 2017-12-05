'use strict'

var _s = require('underscore.string')
var chalk = require('chalk')
var files = require('./optional-files.json')
var mkdirp = require('mkdirp')
var path = require('path')
var Yeoman = require('yeoman-generator')
var yosay = require('yosay')

module.exports = class extends Yeoman {
  initializing () {
    this.log(
      yosay('Hi, my friend! Welcome to ' + chalk.green('Swill boilerplate') + ' generator!')
    )
  }

  prompting () {
    var prompts = [
      {
        name: 'projectName',
        message: 'Your project name'
      }, {
        name: 'projectDescription',
        message: 'Your project description'
      }, {
        name: 'projectHomepage',
        message: 'Project Homepage'
      }, {
        name: 'keywords',
        message: 'Project keywords (comma to split)',
        filter: function (words) {
          return words ? words.split(/\s*,\s*/g) : []
        }
      }, {
        type: 'input',
        name: 'color',
        message: 'Default project color (Use Hex Code)',
        default: '#000000'
      }, {
        type: 'input',
        name: 'language',
        message: 'Default project language (en, en-US, pt-BR, fr-CA...)',
        default: 'en'
      }, {
        name: 'authorName',
        message: 'Author Name'
      }, {
        name: 'authorEmail',
        message: 'Author Email'
      }, {
        name: 'authorHomepage',
        message: 'Author\'s website'
      }, {
        name: 'githubUser',
        message: 'Github User or organization'
      }, {
        type: 'confirm',
        name: 'settingFolder',
        message: 'Do you want to customize the folder structure?',
        default: false
      }, {
        name: 'srcFolder',
        message: 'Source folder??',
        default: 'src',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'destFolder',
        message: 'Destination folder??',
        default: 'dist',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'buildFolder',
        message: 'Builded folder??',
        default: 'build',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'fontsFolder',
        message: 'Webfonts folder??',
        default: 'fonts',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'imgFolder',
        message: 'Images folder??',
        default: 'images',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'stylesFolder',
        message: 'Styles folder??',
        default: 'styles',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        name: 'scriptsFolder',
        message: 'Scripts folder??',
        default: 'scripts',
        when: function (response) {
          return response.settingFolder
        }
      }, {
        type: 'list',
        name: 'workflow',
        message: 'Choose the workflow',
        choices: [{
          name: 'Static',
          value: 'static'
        }, {
          name: 'Handlebars',
          value: 'handlebars'
        }]
      }, {
        type: 'list',
        name: 'preprocessor',
        message: 'Which CSS preprocessor?',
        choices: [{
          name: 'Stylus',
          value: 'stylus'
        }, {
          name: 'SASS',
          value: 'sass'
        }]
      }, {
        type: 'checkbox',
        name: 'options',
        message: 'Would you?',
        choices: [{
          name: 'Validate HTML (W3C)',
          value: 'validateHTML',
          checked: false
        }, {
          name: 'Lint CSS',
          value: 'lintCSS',
          checked: false
        }, {
          name: 'Lint JS',
          value: 'lintJS',
          checked: true
        }]
      }, {
        type: 'confirm',
        name: 'inlineSVG',
        message: 'Use SVG inline?',
        default: true
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'Lib/plugin?',
        choices: [{
          name: 'jQuery (Lib designed to simplify the client-side scripting of HTML)',
          value: 'jquery',
          checked: true
        }, {
          name: 'Normalize.css (Make browsers render all elements more consistently)',
          value: 'normalize',
          checked: true
        }, {
          name: 'OutdatedBrowser (Detects outdated browsers and advises users to upgrade to a new version)',
          value: 'outdatedBrowser',
          checked: true
        }]
      }, {
        type: 'confirm',
        name: 'jqueryLogoDownloadtip',
        message: 'Add jQuery Logo Downloadtip? (Allow users to download multiple logotype image types when they trying to grab low resolution logo)',
        default: false,
        when: function (response) {
          return response.features.indexOf('jquery') >= 0
        }
      }, {
        type: 'checkbox',
        name: 'files',
        message: 'Which files do you need?',
        choices: files
      }, {
        type: 'checkbox',
        name: 'gitHooks',
        message: 'You can force some rules before git comands. Do you want?',
        choices: [{
          name: 'Run eslint before commit',
          value: 'precommit',
          checked: false
        }, {
          name: 'Run tests before push',
          value: 'prepush',
          checked: false
        }]
      }, {
        type: 'checkbox',
        name: 'integrations',
        message: 'Integration tools',
        choices: [{
          name: 'Travis CI',
          value: 'travis',
          checked: false
        }, {
          name: 'Coveralls.io',
          value: 'coveralls',
          checked: false
        }]
      }
    ]

    // ================== Get props ================== //
    return this.prompt(prompts).then(function (props) {
      this.prompts = props
      this.props = {}

      this.props.githubUser = (props.githubUser) ? props.githubUser : '{Github User}'

      this.props.project = {
        name: (props.projectName) ? _s.clean(props.projectName) : '{Project Name}',
        cleanName: (props.projectName) ? _s.clean(props.projectName) : 'project-name',
        sanitizeName: (props.projectName) ? _s.slugify(_s.clean(props.projectName)) : '{project-name}',
        description: props.projectDescription,
        homepage: props.projectHomepage,
        keywords: props.keywords,
        color: props.color,
        language: props.language,
        joinedKeywords: props.keywords && props.keywords.join()
      }

      this.props.project.repository = 'https://github.com/' + this.props.githubUser + '/' + this.props.project.sanitizeName + '.git'

      this.props.author = {
        name: _s.clean(props.authorName),
        email: _s.clean(props.authorEmail),
        homepage: _s.clean(props.authorHomepage)
      }

      this.props.preprocessor = {
        name: props.preprocessor,
        extension: (props.preprocessor === 'sass') ? 'scss' : 'styl'
      }

      this.props.folder = {
        src: props.srcFolder || 'src',
        dest: props.destFolder || 'dist',
        build: props.buildFolder || 'build',
        fonts: props.fontsFolder || 'fonts',
        images: props.imgFolder || 'images',
        styles: props.stylesFolder || 'styles',
        scripts: props.scriptsFolder || 'scripts'
      }

      this.props.use = {
        jquery: props.features.indexOf('jquery') >= 0,
        jqueryLogoDownloadtip: props.jqueryLogoDownloadtip,
        validateHTML: props.options.indexOf('validateHTML') >= 0,
        lint: {
          js: props.options.indexOf('lintJS') >= 0,
          css: props.options.indexOf('lintCSS') >= 0
        },
        normalize: props.features.indexOf('normalize') >= 0,
        outdatedBrowser: props.features.indexOf('outdatedBrowser') >= 0,
        workflow: props.workflow,
        inlineSVG: props.inlineSVG,
        gitHooks: {
          precommit: props.gitHooks.indexOf('precommit') >= 0,
          prepush: props.gitHooks.indexOf('prepush') >= 0
        }
      }

      this.props.include = {
        htaccess: props.files.indexOf('htaccess') >= 0,
        404: props.files.indexOf('404') >= 0,
        readme: props.files.indexOf('readme') >= 0,
        contributing: props.files.indexOf('contributing') >= 0,
        changelog: props.files.indexOf('changelog') >= 0,
        crossdomain: props.files.indexOf('crossdomain') >= 0,
        browserconfig: props.files.indexOf('browserconfig') >= 0,
        manifest: props.files.indexOf('manifestJson') >= 0,
        robots: props.files.indexOf('robots') >= 0,
        humans: props.files.indexOf('humans') >= 0,
        npmignore: props.files.indexOf('npmignore') >= 0
      }

      this.props.integrations = {
        travis: props.integrations.indexOf('travis') >= 0,
        coveralls: props.integrations.indexOf('coveralls') >= 0
      }
    }.bind(this))
  }

  // ====================== Copy settings files ====================== //
  default () {
    // license
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.project.name,
      email: '',
      website: ''
    })
  }

  // ====================== Copy boilerplate files ======================//
  writing () {
    if (path.basename(this.destinationPath()) !== this.props.project.sanitizeName) {
      this.log('The folder ' + this.props.project.sanitizeName + ' will be automatically created!!')
      mkdirp(this.props.project.sanitizeName)
      this.destinationRoot(this.destinationPath(this.props.project.sanitizeName))
    }

    // Package.json
    var packageJson = require('./templates/_package.json')

    packageJson.name = this.props.project.sanitizeName
    packageJson.description = this.props.project.description || ''
    packageJson.homepage = this.props.project.homepage || ''
    packageJson.keywords = this.props.project.keywords || []
    packageJson.author.name = this.props.author.name
    packageJson.author.url = this.props.author.homepage
    packageJson.repository.url = this.props.project.repository
    packageJson.scripts.lint = `${packageJson.scripts.lint} ${this.props.folder.src}/${this.props.folder.scripts}/.`
    this.props.integrations.coveralls && (packageJson.devDependencies['coveralls'] = '3.0.0') && (packageJson.scripts['coveralls'] = 'nyc --reporter=text-lcov npm test | coveralls')
    this.props.use.inlineSVG && (packageJson.devDependencies['gulp-inline'] = '0.1.3');

    // Optional githooks
    (this.props.use.gitHooks.prepush || this.props.use.gitHooks.precommit) && (packageJson.devDependencies['husky'] = '0.14.3')
    this.props.use.gitHooks.prepush && (packageJson.scripts.prepush = 'npm test')
    this.props.use.gitHooks.precommit && (packageJson.scripts.precommit = 'npm run lint:fix && npm run lint')

    // Optional preprocessor
    this.props.preprocessor.name === 'sass' && (packageJson.devDependencies['gulp-sass'] = '3.1.0')
    this.props.preprocessor.name === 'stylus' && (packageJson.devDependencies['gulp-stylus'] = '2.6.0')

    // Optional libs and plugins
    this.props.use.workflow === 'handlebars' && (packageJson.devDependencies['gulp-hb'] = '6.0.2')
    this.props.use.jquery && (packageJson.dependencies.jquery = '3.2.1')
    this.props.use.jqueryLogoDownloadtip && (packageJson.dependencies['jquery-logo-downloadtip'] = '2.0.0')
    this.props.use.outdatedBrowser && (packageJson.dependencies['outdatedbrowser'] = '1.1.5') && (packageJson.devDependencies['exports-loader'] = '0.6.4')
    this.props.use.normalize && (packageJson.dependencies['normalize.css'] = '7.0.0')

    this.fs.writeJSON(this.destinationPath('package.json'), packageJson)

    // Babel
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    )

    // Editorconfig
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    )

    // Git
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    )

    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        folder: this.props.folder
      }
    )

    // Lint
    this.fs.copy(
      this.templatePath('csslintrc'),
      this.destinationPath('.csslintrc')
    )

    this.fs.copyTpl(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc'), {
        use: this.props.use
      }
    )

    this.fs.copyTpl(
      this.templatePath('swillrc.json'),
      this.destinationPath('.swillrc.json'), {
        folder: this.props.folder,
        use: this.props.use
      }
    )

    // Swill Package.json
    var swillPackage = require('../package.json')

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        boilerplate: swillPackage,
        preprocessor: this.props.preprocessor,
        use: this.props.use
      }
    )

    // Webpack
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'), {
        boilerplate: swillPackage,
        preprocessor: this.props.preprocessor,
        use: this.props.use
      }
    )

    // Styles
    this.fs.copyTpl(
      this.templatePath('src/styles/**/*.' + this.props.preprocessor.extension),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.styles + '/'), {
        folder: this.props.folder,
        project: this.props.project
      }
    )

    this.fs.copyTpl(
      this.templatePath('src/index.' + this.props.preprocessor.extension),
      this.destinationPath(this.props.folder.src + '/index.' + this.props.preprocessor.extension), {
        folder: this.props.folder
      }
    )

    this.fs.write(this.props.folder.src + '/' + this.props.folder.styles + '/helpers/functions/.gitkeep', '')

    // scripts
    this.fs.copyTpl(
      this.templatePath('src/scripts/**/*'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.scripts + '/'), {
        use: this.props.use,
        project: this.props.project
      }
    )

    this.fs.copyTpl(
      this.templatePath('src/index.js'),
      this.destinationPath(this.props.folder.src + '/index.js'), {
        folder: this.props.folder
      }
    )

    // Images
    if (this.props.include.manifest) {
      this.fs.copy(
        this.templatePath('src/images/touch/icon-128x128.png'),
        this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/touch/icon-128x128.png')
      )
    }

    if (this.props.include.browserconfig || this.props.include.manifest) {
      this.fs.copy(
        this.templatePath('src/images/touch/ms-touch-icon-144x144-precomposed.png'),
        this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/touch/ms-touch-icon-144x144-precomposed.png')
      )
    }

    this.fs.copy(
      this.templatePath('src/images/touch/chrome-touch-icon-192x192.png'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/touch/chrome-touch-icon-192x192.png')
    )

    this.fs.copy(
      this.templatePath('src/images/touch/apple-touch-icon.png'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/touch/apple-touch-icon.png')
    )

    this.fs.copy(
      this.templatePath('src/images/sprite/.gitkeep'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/sprite/.gitkeep')
    )

    this.fs.copy(
      this.templatePath('src/images/logos/**/*'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images + '/logos/')
    )

    this.fs.write(this.props.folder.src + '/' + this.props.folder.images + '/copyright/.gitkeep', '')

    // Favicon
    this.fs.copy(
      this.templatePath('src/favicon.ico'),
      this.destinationPath(this.props.folder.src + '/favicon.ico')
    )

    // Html or Handlebars
    var htmlOptions = {
      folder: this.props.folder,
      include: this.props.include,
      project: this.props.project,
      use: this.props.use
    }

    if (this.props.use.workflow === 'handlebars') {
      this.fs.copyTpl(
        this.templatePath('src/includes/**/*'),
        this.destinationPath(this.props.folder.src + '/includes/'),
        htmlOptions
      )

      this.fs.copyTpl(
        this.templatePath('src/index-handlebars.html'),
        this.destinationPath(this.props.folder.src + '/index.html'),
        htmlOptions
      )

      this.fs.copyTpl(
        this.templatePath('src/404-handlebars.html'),
        this.destinationPath(this.props.folder.src + '/404.html'),
        htmlOptions
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('src/index.html'),
        this.destinationPath(this.props.folder.src + '/index.html'),
        htmlOptions
      )
      this.fs.copyTpl(
        this.templatePath('src/404.html'),
        this.destinationPath(this.props.folder.src + '/404.html'),
        htmlOptions
      )
    }

    // font
    this.fs.write(this.props.folder.src + '/' + this.props.folder.fonts + '/.gitkeep', '')

    // ====================== Copy optional Files  ======================//

    // optionalFiles
    if (!this.props.include[404]) {
      this.fs.delete(this.destinationPath(this.props.folder.src + '/404.html'))
    }

    if (this.props.include.htaccess) {
      this.fs.copy(
        this.templatePath('../../node_modules/apache-server-configs/dist/.htaccess'),
        this.destinationPath(this.props.folder.src + '/.htaccess')
      )
    }

    if (this.props.include.contributing) {
      this.fs.copy(
        this.templatePath('CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md')
      )
    }

    if (this.props.include.changelog) {
      this.fs.copy(
        this.templatePath('CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      )
    }

    if (this.props.integrations.travis) {
      this.fs.copyTpl(
        this.templatePath('travis'),
        this.destinationPath('.travis.yml'), {
          include: this.props.include,
          integrations: this.props.integrations
        }
      )
    }

    if (this.props.include.npmignore) {
      this.fs.copyTpl(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore'), {
          folder: this.props.folder
        }
      )
    }

    if (this.props.include.crossdomain) {
      this.fs.copy(
        this.templatePath('src/crossdomain.xml'),
        this.destinationPath(this.props.folder.src + '/crossdomain.xml')
      )
    }

    if (this.props.include.browserconfig) {
      this.fs.copyTpl(
        this.templatePath('src/browserconfig.xml'),
        this.destinationPath(this.props.folder.src + '/browserconfig.xml'), {
          folder: this.props.folder,
          project: this.props.project
        }
      )
    }

    if (this.props.include.manifest) {
      this.fs.copyTpl(
        this.templatePath('src/manifest.json'),
        this.destinationPath(this.props.folder.src + '/manifest.json'), {
          folder: this.props.folder,
          project: this.props.project
        }
      )
    }

    if (this.props.include.robots) {
      this.fs.copy(
        this.templatePath('src/robots.txt'),
        this.destinationPath(this.props.folder.src + '/robots.txt')
      )
    }

    if (this.props.include.humans) {
      this.fs.copy(
        this.templatePath('src/humans.txt'),
        this.destinationPath(this.props.folder.src + '/humans.txt')
      )
    }
  }

  // ====================== YO actions ====================== //

  install () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    this.prompts.license = this.props.license = pkg.license

    if (this.props.include.readme) {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          project: this.props.project,
          githubUser: this.props.githubUser,
          license: this.props.license
        }
      )
    }

    var swillPackage = require('../package.json')
    var version = { version: swillPackage.version }
    var prompts = Object.assign(version, this.prompts)

    this.config.set(prompts)
    this.config.save()
    this.installDependencies({bower: false})
  }

  end () {
    this.log(yosay(
      'Done!'
    ))
  }
}
