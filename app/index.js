/*eslint-env node */
/*eslint strict: ["error", "global"]*/
'use strict';

var _s = require('underscore.string'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    prompting: function() {
        this.log(yosay(
            'Hi, my frind! Welcome to ' + chalk.green('Swill boilerplate') + ' generator!'
        ));

        var prompts = [{
            name: 'projectName',
            message: 'Your project name',
            default: 'Project Name'
        }, {
            name: 'projectHomepage',
            message: 'Project Homepage'
        }, {
            name: 'authorName',
            message: 'Author Name'
        }, {
            name: 'authorEmail',
            message: 'Author Email'
        }, {
            name: 'authorWebsite',
            message: 'Author\'s website'
        }, {
            name: 'githubUser',
            message: 'Github User'
        }, {
            type: 'confirm',
            name: 'settingFolder',
            message: 'You can rename default folder structure, do you want customize?',
            default: false
        }, {
            name: 'srcFolder',
            message: 'Source folder??',
            default: 'src',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'destFolder',
            message: 'Destination folder??',
            default: 'app',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'buildFolder',
            message: 'Builded folder??',
            default: 'build',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'bowerFolder',
            message: 'Bower folder??',
            default: 'bower_components',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'fontsDestFolder',
            message: 'Webfonts destination folder??',
            default: 'fonts',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'spriteSrcFolder',
            message: 'Sprite source folder??',
            default: 'sprite',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'imgSrcFolder',
            message: 'Images source folder??',
            default: 'images',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'imgDestFolder',
            message: 'Images destination folder??',
            default: 'img',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'stylesSrcFolder',
            message: 'Styles source folder??',
            default: 'stylesheets',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'stylesDestFolder',
            message: 'Styles destination folder??',
            default: 'css',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'scriptsSrcFolder',
            message: 'Scripts source folder??',
            default: 'scripts',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            name: 'scriptsDestFolder',
            message: 'Scripts destination folder??',
            default: 'js',
            when: function(response) {
                return response.settingFolder === true;
            }
        }, {
            type: 'list',
            name: 'preprocessor',
            message: 'Which CSS preprocessor you will use?',
            choices: [{
                name: 'Stylus',
                value: 'stylus'
            }, {
                name: 'SASS',
                value: 'sass'
            }]
        }, {
        //     type: 'confirm',
        //     name: 'componentsCSS',
        //     message: 'Do you want use some basic CSS setings? Like paragraphs, titles, buttons ...'
        // }, {
            type: 'checkbox',
            name: 'options',
            message: 'Would you like to use?',
            choices: [{
                name: 'ECMAScript 6',
                value: 'es6',
                checked: true
            }, {
                name: 'Lint CSS',
                value: 'lintCSS',
                checked: false
            }, {
                name: 'Lint JS',
                value: 'lintjs',
                checked: true
            }]
        }, {
            type: 'checkbox',
            name: 'features',
            message: 'Do you want use some of these lib/plugin?',
            choices: [{
                name: 'jQuery',
                value: 'jquery',
                checked: true
            }, {
                name: 'Normalize.css',
                value: 'normalize',
                checked: true
            }, {
                name: 'OutdatedBrowser',
                value: 'outdatedBrowser',
                checked: true
            }]
        }, {
            when: function(response) {
                return response.features.indexOf('jquery') >= 0;
            },
            type: 'confirm',
            name: 'jqueryLogoDownloadtip',
            message: 'Want use jQuery Logo Downloadtip?',
            default: false
        }, {
            type: 'checkbox',
            name: 'files',
            message: 'Which files do you need?',
            choices: [{
                name: 'Readme',
                value: 'readme',
                checked: false
            }, {
                name: 'Contributing',
                value: 'contributing',
                checked: false
            }, {
                name: 'Changelog',
                value: 'changelog',
                checked: false
            }, {
                name: '404 page',
                value: '404',
                checked: false
            }, {
                name: '.htaccess (Apache Server Configs)',
                value: 'htaccess',
                checked: false
            }, {
                name: 'crossdomain.xml (Cross-domain policy)',
                value: 'crossdomain',
                checked: false
            }, {
                name: 'manifest.json(Chrome app info)',
                value: 'manifestJson',
                checked: false
            }, {
                name: 'manifest.webapp (Firefox OS app info)',
                value: 'manifestWebapp',
                checked: false
            }, {
                name: 'robots.txt (Instructions about their site to web robots)',
                value: 'robots',
                checked: false
            }, {
                name: 'humans.txt (Contains the information about humans to the web building.)',
                value: 'humans',
                checked: false
            }]
        }];

        return this.prompt(prompts).then(function (props) {
            this.props = props;

            this.props.project = {
                name: _s.clean(this.props.projectName),
                slugName: _s.slugify(_s.clean(this.props.projectName)),
                homepage: this.props.projectHomepage
            };

            this.props.author = {
                name: _s.clean(this.props.authorName),
                email: _s.clean(this.props.authorEmail),
                homepage: _s.clean(this.props.authorWebsite)
            };

            if (props.preprocessor === 'sass') {
                this.extensionStyle = 'scss';
            } else {
                this.extensionStyle = 'styl';
            }

            if (!this.props.settingFolder) {
                this.props.srcFolder = 'src';
                this.props.destFolder = 'app';
                this.props.buildFolder = 'build';
                this.props.bowerFolder = 'bower_components';
                this.props.fontsDestFolder = 'fonts';
                this.props.spriteSrcFolder = 'sprite';
                this.props.imgSrcFolder = 'images';
                this.props.imgDestFolder = 'img';
                this.props.stylesSrcFolder = 'stylesheets';
                this.props.stylesDestFolder = 'css';
                this.props.scriptsSrcFolder = 'scripts';
                this.props.scriptsDestFolder = 'js';
            }

            this.includeJquery = props.features.indexOf('jquery') >= 0;
            this.includeLintCSS = this.props.features.indexOf('lintCSS') >= 0;
            this.includeLintJS = this.props.features.indexOf('lintJS') >= 0;
            this.includeES6 = this.props.features.indexOf('es6') >= 0;
            this.includeOutdatedBrowser = this.props.features.indexOf('outdatedBrowser') >= 0;
            this.includeNormalize = this.props.features.indexOf('normalize') >= 0;
        }.bind(this));
    },

    config: function() {
        this.fs.copyTpl(
            this.templatePath('config.json'),
            this.destinationPath('config.json'), {
                folder: {
                    src: this.props.srcFolder,
                    dest: this.props.destFolder,
                    build: this.props.buildFolder,
                    bower: this.props.bowerFolder,
                    fonts: this.props.fontsDestFolder,
                    sprite: this.props.spriteSrcFolder,
                    images: {
                        src: this.props.imgSrcFolder,
                        dest: this.props.imgDestFolder
                    },
                    styles: {
                        src: this.props.stylesSrcFolder,
                        dest: this.props.stylesDestFolder
                    },
                    scripts: {
                        src: this.props.scriptsSrcFolder,
                        dest: this.props.scriptsDestFolder
                    }
                },
                jquery: this.includeJquery,

                lintcss: this.includeLintCSS,

                lintjs: this.includeLintJS,

                es6: this.includeES6
            }
        );
    },
    header: function() {
        this.fs.copyTpl(
            this.templatePath('src/header-comments.txt'),
            this.destinationPath(this.props.srcFolder + '/header-comments.txt'), {project: this.props.project}
        );
    },
    bower: function() {
        var bowerJson = require('./templates/_bower.json');

        bowerJson.name = this.props.project.slugName;
        bowerJson.homepage = this.props.project.homepage;
        bowerJson.author.name = this.props.author.name;
        bowerJson.author.homepage = this.props.author.homepage;
        this.includeJquery && (bowerJson.devDependencies.jquery = '~2.0.0');
        this.props.jqueryLogoDownloadtip && (bowerJson.devDependencies['jquery-logo-downloadtip'] = '~2.0.0');
        this.includeOutdatedBrowser && (bowerJson.devDependencies['outdated-browser'] = '^1.1.3');
        this.includeNormalize && (bowerJson.devDependencies['normalize-css'] = '^4.2.0');

        this.fs.writeJSON('bower.json', bowerJson);

        this.fs.copyTpl(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc'), {
                folder: this.props.destFolder + '/' + this.props.bowerFolder
            }
        );
    },
    test: function() {
        this.fs.copy(
            this.templatePath('karma.conf.js'),
            this.destinationPath('karma.conf.js')
        );

        this.fs.copy(
            this.templatePath('spec/**/*'),
            this.destinationPath('spec/')
        );
    },
    git: function() {
        this.fs.copy(
            this.templatePath('../../.gitattributes'),
            this.destinationPath('.gitattributes')
        );

        this.fs.copy(
            this.templatePath('../../.gitignore'),
            this.destinationPath('.gitignore')
        );
    },
    gulpfile: function() {
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js'), {
                preprocessor: {
                    name: this.props.preprocessor,
                    extension: this.extensionStyle
                }
            }
        );
    },
    styles: function() {
        // if (this.props.componentsCSS) {
        //     this.fs.copy(
        //         this.templatePath('src/stylesheets/' + this.props.preprocessor + '/components/*'),
        //         this.destinationPath(this.props.srcFolder + '/' + this.props.stylesSrcFolder + '/components')
        //     );
        // }
        this.fs.copyTpl(
            this.templatePath('src/stylesheets/' + this.props.preprocessor + '/**/*'),
            this.destinationPath(this.props.srcFolder + '/' + this.props.stylesSrcFolder + '/'),
            { bower: this.props.destFolder + '/' + this.props.bowerFolder }
        );
    },
    scripts: function() {
        this.fs.copyTpl(
            this.templatePath('src/scripts/**/*'),
            this.destinationPath(this.props.srcFolder + '/' + this.props.scriptsSrcFolder + '/'), {
                outdatedBrowser: this.includeOutdatedBrowser,
                jqueryLogoDownloadtip: this.props.jqueryLogoDownloadtip
            }
        );
    },
    vendor: function() {
        this.fs.copy(
            this.templatePath('src/vendors/**/*'),
            this.destinationPath(this.props.srcFolder + '/vendors')
        );
    },
    images: function() {
        this.fs.copy(
            this.templatePath('src/images/**/*'),
            this.destinationPath(this.props.srcFolder + '/' + this.props.imgSrcFolder + '/')
        );

        this.fs.copy(
            this.templatePath('public/img/**/*'),
            this.destinationPath(this.props.destFolder + '/' + this.props.imgDestFolder + '/')
        );
    },
    package: function() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),{
                preprocessor: {
                    name: this.props.preprocessor
                }
            }
        );
    },
    lint: function() {
        this.fs.copy(
            this.templatePath('csslintrc'),
            this.destinationPath('.csslintrc')
        );

        this.fs.copyTpl(
            this.templatePath('../../.eslintrc'),
            this.destinationPath('.eslintrc'), {
                jquery: this.includeJquery
            }
        );
    },
    editorconfig: function() {
        this.fs.copy(
            this.templatePath('../../.editorconfig'),
            this.destinationPath('.editorconfig')
        );
    },
    htaccess: function() {
        if(this.props.files.indexOf('htaccess') >= 0) {
            this.fs.copy(
                this.templatePath('../../node_modules/apache-server-configs/dist/.htaccess'),
                this.destinationPath(this.props.destFolder + '/.htaccess')
            );
        }
    },
    readme: function() {
        if(this.props.files.indexOf('readme') >= 0) {
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'), {
                    project: this.props.project,
                    githubUser: this.props.githubUser
                }
            );
        }
    },
    contributing: function() {
        if(this.props.files.indexOf('contributing') >= 0) {
            this.fs.copy(
                this.templatePath('CONTRIBUTING.md'),
                this.destinationPath('CONTRIBUTING.md')
            );
        }
    },
    changelog: function() {
        if(this.props.files.indexOf('changelog') >= 0) {
            this.fs.copy(
                this.templatePath('CHANGELOG.md'),
                this.destinationPath('CHANGELOG.md')
            );
        }
    },
    // page404: function() {
    //     if(this.props.files.indexOf('404') >= 0) {
    //         this.fs.copy(
    //             this.templatePath('public/404.html'),
    //             this.destinationPath(this.props.destFolder + '/404.html')
    //         );
    //     }
    // },
    crossdomain: function() {
        if(this.props.files.indexOf('crossdomain') >= 0) {
            this.fs.copy(
                this.templatePath('public/crossdomain.xml'),
                this.destinationPath(this.props.destFolder + '/crossdomain.xml')
            );
        }
    },
    manifestJson: function() {
        if(this.props.files.indexOf('manifestJson') >= 0) {
            this.fs.copy(
                this.templatePath('public/manifest.json'),
                this.destinationPath(this.props.destFolder + '/manifest.json')
            );
        }
    },
    manifestWebapp: function() {
        if(this.props.files.indexOf('manifestWebapp') >= 0) {
            this.fs.copy(
                this.templatePath('public/manifest.webapp'),
                this.destinationPath(this.props.destFolder + '/manifest.webapp')
            );
        }
    },
    robots: function() {
        if(this.props.files.indexOf('robots') >= 0) {
            this.fs.copy(
                this.templatePath('public/robots.txt'),
                this.destinationPath(this.props.destFolder + '/robots.txt')
            );
        }
    },
    humans: function() {
        if(this.props.files.indexOf('humans') >= 0) {
            this.fs.copy(
                this.templatePath('public/humans.txt'),
                this.destinationPath(this.props.destFolder + '/humans.txt')
            );
        }
    },
    handlebars: function() {
        this.fs.copy(
            this.templatePath('src/html/**/*'),
            this.destinationPath(this.props.srcFolder + '/html/')
        );
    },
    // misc: function() {
    //     this.fs.copyTpl(
    //     this.templatePath('public/index.html'),
    //     this.destinationPath(this.props.destFolder + '/index.html'), {
    //         humans: this.props.files.indexOf('humans') >= 0,
    //         jquery: this.includeJquery,
    //         outdatedBrowser: this.includeOutdatedBrowser,
    //         jqueryLogoDownloadtip: this.props.jqueryLogoDownloadtip,
    //         normalize: this.includeNormalize,
    //         folder: {
    //             dest: this.props.destFolder,
    //             bower: this.props.bowerFolder,
    //             images: {
    //                 dest: this.props.imgDestFolder
    //             },
    //             styles: {
    //                 dest: this.props.stylesDestFolder
    //             },
    //             scripts: {
    //                 dest: this.props.scriptsDestFolder
    //             }
    //         }
    //     });
    // },
    license: function() {
        this.composeWith('license', {
            options: {
                name: this.props.project.name,
                email: '',
                website: ''
            }
        }, {
            local: require.resolve('generator-license/app')
        });
    },
    save: function() {
        this.config.set(this.props);
        this.config.save();
        // this.installDependencies();
    }
});
