/*
* Swill Boilerplate v<%= boilerplate.version %>
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const babelify = require('babelify')
const browserSync = require('browser-sync')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const config = require('./config.json')
const del = require('del')
const envify = require('envify/custom')
const fs = require('fs')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const handlebars = require('gulp-hb')
const Karma = require('karma').Server
const merge = require('merge-stream')
const mergeMediaQueries = require('gulp-merge-media-queries')
const path = require('path')
const plugins = require('gulp-load-plugins')()
const sequence = require('run-sequence')
const source = require('vinyl-source-stream')
const spritesmith = require('gulp.spritesmith')
const svgSprite = require('gulp-svg-sprite')

// ***************************** Path configs ***************************** //

const basePaths = config.basePaths

const paths = {
  html: {
    src: basePaths.src + basePaths.handlebars.src
  },

  images: {
    src: basePaths.src + basePaths.images.src,
    dest: basePaths.dest + basePaths.images.dest,
    build: basePaths.build + basePaths.images.src
  },

  sprite: {
    src: basePaths.src + basePaths.images.src + basePaths.sprite.src
  },

  scripts: {
    src: basePaths.src + basePaths.scripts.src,
    dest: basePaths.dest + basePaths.scripts.dest,
    build: basePaths.build + basePaths.scripts.dest
  },

  styles: {
    src: basePaths.src + basePaths.styles.src,
    dest: basePaths.dest + basePaths.styles.dest,
    build: basePaths.build + basePaths.styles.dest
  }
}

// ******************************* Settings ******************************* //
let env = process.env.NODE_ENV ? 'production' : 'development'
const extensionStyle = '<%= preprocessor.extension %>'
const headerProject = fs.readFileSync(`${basePaths.src}header-comments.txt`, 'utf8')
const babelOption = { presets: ['env'] }
const headerWrapper = { header: `${headerProject}\n` }

// ******************************** Tasks ********************************* //

gulp.task('coverall', () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(plugins.coveralls())
})

gulp.task('karma', done => {
  new Karma({
    configFile: path.join(__dirname, karma.conf.js)
  }, done).start()
})

gulp.task('test', () => {
  sequence('karma', 'coverall')
})

gulp.task('handlebars', () => {
  if (config.handlebars) {
    return gulp
      .src(`${paths.html.src}**/*.html`)
      .pipe(handlebars({
        partials: `${paths.html.src}${basePaths.handlebars.partials.src}**/*.hbs`
      }))
      .pipe(plugins.w3cjs())
      .pipe(gulp.dest(basePaths.dest))
      .pipe(plugins.notify({message: 'Handlebars task complete', onLast: true}))
  }
})

gulp.task('svg-inline', () => {
  if (config.inlineSVG) {
    return gulp
      .src(`${basePaths.dest}**/*.html`)
      .pipe(plugins.inline({
        base: './',
        disabledTypes: ['css', 'js']
      }))
      .pipe(gulp.dest(basePaths.dest))
  }
})

gulp.task('styles-helpers', () => {
  const mixins = gulp
    .src(`${paths.styles.src}helpers/mixins/*.{styl,scss}`)
    .pipe(plugins.concat(`_mixins.${extensionStyle}`))
    .pipe(gulp.dest(`${paths.styles.src}helpers`))

  const functions = gulp
    .src(`${paths.styles.src}helpers/functions/*.{styl,scss}`)
    .pipe(plugins.concat(`_functions.${extensionStyle}`))
    .pipe(gulp.dest(`${paths.styles.src}helpers`))

  return merge(mixins, functions)
})

gulp.task('styles', () => {<% if (preprocessor.name === "stylus") { %>
  gulp
    .src([
      `${paths.styles.src}*.styl`,
      `!${paths.styles.src}_*.styl`
    ])
    .pipe(plugins.plumber())
    .pipe(
      plugins.stylus({ 'include css': true })
        .on('error', err => {
          console.log(err.message)

          // If rename the stylus file change here
          plugins.file('styles.css', `body:before{white-space: pre; font-family: monospace; content: "${err.message}";}`, { src: true })
            .pipe(plugins.replace('\\', '/'))
            .pipe(plugins.replace(/\n/gm, '\\A '))
            .pipe(plugins.replace('"', '\''))
            .pipe(plugins.replace("content: '", 'content: "'))
            .pipe(plugins.replace('\';}', '";}'))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(gulp.dest(paths.styles.dest))
          })
  )<% } %><% if (preprocessor.name === "sass") { %>
  gulp
    .src(`${paths.styles.src}styles.scss`)
    .pipe(plugins.plumber())
    .pipe(plugins.sass({precision: 3, outputStyle: 'expanded'})
      .on('error', plugins.sass.logError)
    )<% } %>
    .pipe(plugins.autoprefixer({ browsers: config.autoprefixerBrowsers }))
    .pipe(plugins.wrapper({ header: `${headerProject}\n` }))
    .pipe(mergeMediaQueries({log: true}))
    .pipe(plugins.if(config.lintCSS, plugins.csslint('./.csslintrc')))
    .pipe(plugins.if(config.lintCSS, plugins.csslint.formatter()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(plugins.csso())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(plugins.notify({message: 'Styles task complete', onLast: true}))
})

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', () => {
  const sprite = gulp
    .src(`${paths.sprite.src}**/*.png`)
    .pipe(plugins.plumber())
    .pipe(
      spritesmith({
        imgName: 'bitmap-sprite.png',
        cssName: `_bitmap-sprite.${extensionStyle}`,
        cssOpts: {
          cssSelector: item => {
            if (item.name.indexOf('~hover') !== -1) {
              return `.icon-${item.name.replace('~hover', ':hover')}`
            } else {
              return `.icon-${item.name}`
            }
          }
        },
        imgPath: `../${basePaths.images.dest}bitmap-sprite.png`,
        padding: 2,
        algorithm: 'top-down'
      })
    )

  sprite.img
    .pipe(buffer())
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.images.dest))

  sprite.css
    .pipe(gulp.dest(`${paths.styles.src}helpers`))
    .pipe(plugins.notify({message: 'Bitmap sprite task complete', onLast: true}))

  return sprite
})

// Generate SVG Sprite
gulp.task('vetor-sprite', () => {
  const spriteOptions = {
    shape: {
      spacing: {padding: 2}
    },
    mode: {
      css: {
        prefix: '.icon-%s',
        dest: './',
        sprite: `../${basePaths.images.dest}vetor-sprite.svg`,
        layout: 'vertical',
        bust: false,
        render: {}
      }
    }
  }

  spriteOptions.mode.css.render[extensionStyle] = {}

  spriteOptions.mode.css.render[extensionStyle].dest = `../../${paths.styles.src}helpers/_vetor-sprite.${extensionStyle}`

  return gulp
    .src(`${paths.sprite.src}*.svg`)
    .pipe(plugins.plumber())
    .pipe(svgSprite(spriteOptions))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(plugins.notify({message: 'SVG sprite task complete', onLast: true}))
})

// Fallback convert SVG to PNG
gulp.task('svg2png', () => {
  return gulp
    .src(`${paths.images.dest}vetor-sprite.svg`)
    .pipe(plugins.plumber())
    .pipe(plugins.svg2png())
    .pipe(gulp.dest(paths.images.dest))
})

// Optimize Images
gulp.task('images', () => {
  const images = gulp
    .src([
      `${paths.images.src}**/*.{bmp,gif,jpg,jpeg,png,svg}`,
      `!${paths.sprite.src}**/*`
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(paths.images.dest))
    .pipe(plugins.imagemin({optimizationLevel: 5, progressive: true}))
    .pipe(gulp.dest(paths.images.dest))

  const svg = gulp
    .src([
      `${paths.images.src}**/*.svg`,
      `!${paths.sprite.src}**/*`
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(paths.images.dest))
    .pipe(plugins.svg2png())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(plugins.notify({message: 'Images task complete', onLast: true}))

  return merge(images, svg)
})

// Compile and Minify Other Scripts
gulp.task('other-scripts', () => {
  return gulp
    .src([
      `${paths.scripts.src}*.js`,
      `!${paths.scripts.src}index.js`
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.newer(paths.scripts.dest))
    .pipe(plugins.plumber())
    .pipe(plugins.if(config.lintJS, plugins.eslint()))
    .pipe(plugins.if(config.lintJS, plugins.eslint.format()))
    .pipe(plugins.babel(babelOption))
    .pipe(plugins.wrapper(headerWrapper))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(plugins.notify({message: 'Scripts task complete', onLast: true}))
})

// Lint scripts
gulp.task('lint-script', () => {
  gulp
    .src(`${paths.scripts.src}**/*.js`)
    .pipe(plugins.if(config.lintJS, plugins.eslint()))
    .pipe(plugins.if(config.lintJS, plugins.eslint.format()))
})

// Compile, Minify Main Script and run other-scripts task
gulp.task('scripts', ['lint-script', 'other-scripts'], () => {
  return browserify(`${paths.scripts.src}index.js`)
    .transform(envify({
      NODE_ENV: env
    }))
    .transform(babelify, babelOption)
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    // .pipe(plugins.plumber())
    .pipe(plugins.cached('scripts'))
    .pipe(plugins.remember('scripts'))
    // .pipe(plugins.plumber())
    .pipe(plugins.wrapper(headerWrapper))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.scripts.dest))
})

// Copy Files to Build
gulp.task('copy', () => {
  const assets = { searchPath: basePaths.dest }

  // Minify and Copy HTML
  const html = gulp
    .src([
      `${basePaths.dest}**/*.{html,php}`
    ])
    .pipe(plugins.useref(assets))
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(plugins.if('*.html', plugins.htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(plugins.if('*.php', plugins.htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(gulp.dest(basePaths.build))

  // Copy All Other files except HTML, PHP, CSS e JS Files
  const allFiles = gulp
    .src([
      `${basePaths.dest}**/*`,
      `!${paths.styles.dest}**/*`,
      `!${paths.scripts.dest}**/*`,
      `!${basePaths.dest}**/*.{html,php}`
    ], {dot: true})
    .pipe(gulp.dest(basePaths.build))

  return merge(html, allFiles)
})

gulp.task('outdatedbrowser', () => {
  return gulp
    .src('node_modules/outdatedbrowser/outdatedbrowser/lang/*')
    .pipe(gulp.dest(`${basePaths.dest}lang/outdated_browser`))
})

// *************************** Utility Tasks ****************************** //

gulp.task('combine-assets', () => {
  const assets = {searchPath: basePaths.dest}

  // Minify and Copy HTML
  return gulp
    .src(`${basePaths.dest}**/*.{html,php}`)
    .pipe(plugins.useref(assets))
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.css', plugins.csso()))
    .pipe(gulp.dest(basePaths.dest))
})

// Clean Directories
gulp.task('clean', cb => {
  const cleanPaths = [
    basePaths.build,
    paths.styles.dest,
    paths.scripts.dest,
    `${paths.styles.src}helpers/{_bitmap-sprite,_vetor-sprite}.{styl,scss}`,
    `${paths.images.dest}**/*`
  ]

  return del(cleanPaths.concat(basePaths.clean.ignore), cb)
})

// ***************************** Main Tasks ******************************* //

// Serve the project and watch
gulp.task('serve', () => {
  browserSync(config.browserSync)

  gulp.watch(
    [
      `${paths.images.src}**/*.{bmp,gif,jpg,jpeg,png,svg}`,
      `!${paths.sprite.src}**/*`
    ],
    ['images', browserSync.reload]
  )

  gulp.watch(`${paths.sprite.src}**/*.{png,gif}`, ['bitmap-sprite', browserSync.reload])

  gulp.watch(`${paths.sprite.src}**/*.svg`, ['vetor-sprite', 'styles', browserSync.reload])

  gulp.watch(`${paths.images.dest}**/*.svg`, ['svg2png', 'handlebars', browserSync.reload])

  gulp.watch(`${paths.scripts.src}*.js`, ['scripts', browserSync.reload])

  gulp.watch(`${paths.scripts.src}settings/**/*.js`, browserSync.reload)

  gulp.watch(
    [
      `${paths.styles.src}**/*.{styl,scss,sass}`,
      `!${paths.styles.src}helpers/{mixins,functions}/*.{styl,scss,sass}`
    ],
    ['styles', browserSync.reload]
  )

  gulp.watch(`${paths.styles.src}helpers/{mixins,functions}/*.{styl,scss,sass}`, ['styles-helpers'])

  gulp.watch(`${paths.html.src}**/*.{html,hbs}`, ['handlebars'])

  gulp.watch(`${basePaths.dest}**/*.{html,php,json}`, ['svg-inline', browserSync.reload])
})

// Serve the project
gulp.task('default', () => {
  sequence('handlebars', 'serve')
})

// Clean, compile and watch and serve the project
gulp.task('default', () => {
  sequence(
    'clean',
    [
      'outdatedbrowser',
      'handlebars',
      'images',
      'bitmap-sprite',
      'vetor-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'svg-inline',
    'styles',
    'scripts',
    'serve'
  )
})

// Clean and compile the project
gulp.task('compile', () => {
  sequence(
    'clean',
    [
      'outdatedbrowser',
      'handlebars',
      'images',
      'bitmap-sprite',
      'vetor-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'svg-inline',
    'styles',
    'scripts'
  )
})

gulp.task('gh', () => {
  return gulp
    .src(`${basePaths.build}**/*`)
    .pipe(ghPages())
})

// Build the project and push the builded folder to gh-pages branch
gulp.task('gh-pages', () => {
  env = 'production'
  sequence(
    [
      'outdatedbrowser',
      'handlebars',
      'images',
      'bitmap-sprite',
      'vetor-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'svg-inline',
    'styles',
    'scripts',
    'copy',
    'gh'
  )
})

// Build Project
gulp.task('build', ['clean'], () => {
  env = 'production'
  sequence(
    [
      'outdatedbrowser',
      'handlebars',
      'images',
      'bitmap-sprite',
      'vetor-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'svg-inline',
    'styles',
    'scripts',
    'copy'
  )
})


// Build Project and serve
gulp.task('build:serve', ['clean'], () => {
  env = 'production'
  sequence(
    [
      'outdatedbrowser',
      'handlebars',
      'images',
      'bitmap-sprite',
      'vetor-sprite',
      'styles-helpers'
    ],
    'svg2png',
    'svg-inline',
    'styles',
    'scripts',
    'copy',
    () => browserSync(config.browserSyncBuild)
  )
})
