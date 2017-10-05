/*
* Swill Boilerplate v<%= boilerplate.version %>
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const config = require('./config.json')
const coveralls = require('gulp-coveralls')
const csslint = require('gulp-csslint')
const csso = require('gulp-csso')
const del = require('del')
const eslint = require('gulp-eslint')
const file = require('gulp-file')
const fs = require('fs')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const handlebars = require('gulp-hb')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const inline = require('gulp-inline')
const Karma = require('karma').Server
const merge = require('merge-stream')
const mergeMediaQueries = require('gulp-merge-media-queries')
const newer = require('gulp-newer')
const notify = require('gulp-notify')
const path = require('path')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const replace = require('gulp-replace')<% if (preprocessor.name === "sass") { %>
const sass = require('gulp-sass')<% } %>
const sequence = require('run-sequence')
const spritesmith = require('gulp.spritesmith')<% if (preprocessor.name === "stylus") { %>
const stylus = require('gulp-stylus')<% } %>
const svg2png = require('gulp-svg2png')
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify')
const useref = require('gulp-useref')
const w3cjs = require('gulp-w3cjs')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackStream = require('webpack-stream')
const wrapper = require('gulp-wrapper')

// ***************************** Path configs ***************************** //

const basePaths = config.basePaths

const paths = {
  html: {
    src: path.join(basePaths.src, basePaths.handlebars.src)
  },

  images: {
    src: path.join(basePaths.src, basePaths.images.src),
    dest: path.join(basePaths.dest, basePaths.images.dest),
    build: path.join(basePaths.build, basePaths.images.src)
  },

  sprite: {
    src: path.join(basePaths.src, basePaths.images.src, basePaths.sprite.src)
  },

  scripts: {
    src: path.join(basePaths.src, basePaths.scripts.src),
    dest: path.join(basePaths.dest, basePaths.scripts.dest),
    build: path.join(basePaths.build, basePaths.scripts.dest)
  },

  styles: {
    src: path.join(basePaths.src, basePaths.styles.src),
    dest: path.join(basePaths.dest, basePaths.styles.dest),
    build: path.join(basePaths.build, basePaths.styles.dest)
  }
}

// ******************************* Settings ******************************* //
let env = process.env.NODE_ENV ? 'production' : 'development'
const extensionStyle = '<%= preprocessor.extension %>'
const headerProject = fs.readFileSync(path.join(basePaths.src, 'header-comments.txt'), 'utf8')
const babelOption = { presets: ['env'] }
const headerWrapper = { header: `${headerProject}\n` }

// ******************************** Tasks ********************************* //

gulp.task('coverall', () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
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
      .src(path.join(paths.html.src, '**/*.html'))
      .pipe(handlebars({
        partials: path.join(paths.html.src, basePaths.handlebars.partials.src, '**/*.hbs')
      }))
      .pipe(w3cjs())
      .pipe(gulp.dest(basePaths.dest))
      .pipe(notify({message: 'Handlebars task complete', onLast: true}))
  }
})

gulp.task('svg-inline', () => {
  if (config.inlineSVG) {
    return gulp
      .src(path.join(basePaths.dest, '**/*.html'))
      .pipe(inline({
        base: './',
        disabledTypes: ['css', 'js']
      }))
      .pipe(gulp.dest(basePaths.dest))
  }
})

gulp.task('styles-helpers', () => {
  const mixins = gulp
    .src(path.join(paths.styles.src, 'helpers/mixins/*.{styl,scss}'))
    .pipe(concat(`_mixins.${extensionStyle}`))
    .pipe(gulp.dest(`${paths.styles.src}helpers`))

  const functions = gulp
    .src(path.join(paths.styles.src, 'helpers/functions/*.{styl,scss}'))
    .pipe(concat(`_functions.${extensionStyle}`))
    .pipe(gulp.dest(`${paths.styles.src}helpers`))

  return merge(mixins, functions)
})

gulp.task('styles', () => {<% if (preprocessor.name === "stylus") { %>
  gulp
    .src([
      path.join(paths.styles.src, '.styl'),
      path.join(`!${paths.styles.src}`, '_*.styl')
    ])
    .pipe(plumber())
    .pipe(
      stylus({ 'include css': true })
        .on('error', err => {
          console.log(err.message)

          // If rename the stylus file change here
          file('styles.css', `body:before{white-space: pre; font-family: monospace; content: "${err.message}";}`, { src: true })
            .pipe(replace('\\', '/'))
            .pipe(replace(/\n/gm, '\\A '))
            .pipe(replace('"', '\''))
            .pipe(replace("content: '", 'content: "'))
            .pipe(replace('\';}', '";}'))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(paths.styles.dest))
          })
  )<% } %><% if (preprocessor.name === "sass") { %>
  gulp
    .src(path.join(paths.styles.src, 'styles.scss'))
    .pipe(plumber())
    .pipe(sass({precision: 3, outputStyle: 'expanded'})
      .on('error', sass.logError)
    )<% } %>
    .pipe(autoprefixer({ browsers: config.autoprefixerBrowsers }))
    .pipe(wrapper({ header: `${headerProject}\n` }))
    .pipe(mergeMediaQueries({log: true}))
    .pipe(gulpIf(config.lintCSS, csslint('./.csslintrc')))
    .pipe(gulpIf(config.lintCSS, csslint.formatter()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(notify({message: 'Styles task complete', onLast: true}))
})

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', () => {
  const sprite = gulp
    .src(path.join(paths.sprite.src, '**/*.png'))
    .pipe(plumber())
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
        imgPath: path.join('../', basePaths.images.dest, 'bitmap-sprite.png'),
        padding: 2,
        algorithm: 'top-down'
      })
    )

  sprite.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))

  sprite.css
    .pipe(gulp.dest(path.join(paths.styles.src, 'helpers')))
    .pipe(notify({message: 'Bitmap sprite task complete', onLast: true}))

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
        sprite: path.join('../', basePaths.images.dest, 'vetor-sprite.svg'),
        layout: 'vertical',
        bust: false,
        render: {}
      }
    }
  }

  spriteOptions.mode.css.render[extensionStyle] = {}

  spriteOptions.mode.css.render[extensionStyle].dest = path.join('../../', paths.styles.src, `helpers/_vetor-sprite.${extensionStyle}`)

  return gulp
    .src(`${paths.sprite.src}*.svg`)
    .pipe(plumber())
    .pipe(svgSprite(spriteOptions))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: 'SVG sprite task complete', onLast: true}))
})

// Fallback convert SVG to PNG
gulp.task('svg2png', () => {
  return gulp
    .src(path.join(paths.images.dest, 'vetor-sprite.svg'))
    .pipe(plumber())
    .pipe(svg2png())
    .pipe(gulp.dest(paths.images.dest))
})

// Optimize Images
gulp.task('images', () => {
  const images = gulp
    .src([
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg}'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({optimizationLevel: 5, progressive: true}))
    .pipe(gulp.dest(paths.images.dest))

  const svg = gulp
    .src([
      path.join(paths.images.src, '**/*.svg'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images.dest))
    .pipe(svg2png())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: 'Images task complete', onLast: true}))

  return merge(images, svg)
})

// Compile and Minify Other Scripts
gulp.task('other-scripts', () => {
  return gulp
    .src([
      path.join(paths.scripts.src, '*.js'),
      path.join(`!${paths.scripts.src}`, 'index.js')
    ])
    .pipe(plumber())
    .pipe(newer(paths.scripts.dest))
    .pipe(plumber())
    .pipe(gulpIf(config.lintJS, eslint()))
    .pipe(gulpIf(config.lintJS, eslint.format()))
    .pipe(babel(babelOption))
    .pipe(wrapper(headerWrapper))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(notify({message: 'Scripts task complete', onLast: true}))
})

// Lint scripts
gulp.task('lint-script', () => {
  gulp
    .src(path.join(paths.scripts.src, '**/*.js'))
    .pipe(gulpIf(config.lintJS, eslint()))
    .pipe(gulpIf(config.lintJS, eslint.format()))
})

// Compile, Minify Main Script and run other-scripts task
// gulp.task('scripts', ['lint-script', 'other-scripts'], () => {
//   return browserify(path.join(paths.scripts.src, 'index.js'))
//     .transform(envify({
//       NODE_ENV: env
//     }))
//     .transform(babelify, babelOption)
//     .bundle()
//     .pipe(source('scripts.js'))
//     .pipe(buffer())
//     // .pipe(plumber())
//     .pipe(cached('scripts'))
//     .pipe(remember('scripts'))
//     // .pipe(plumber())
//     .pipe(wrapper(headerWrapper))
//     .pipe(gulp.dest(paths.scripts.dest))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest(paths.scripts.dest))
// })

gulp.task('scripts', ['lint-script', 'other-scripts'], () => {
  gulp.src(path.join(paths.scripts.src, 'index.js'))
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(paths.scripts.dest))
})

// Copy Files to Build
gulp.task('copy', () => {
  const assets = { searchPath: basePaths.dest }

  // Minify and Copy HTML
  const html = gulp
    .src(path.join(basePaths.dest, '**/*.{html,php}'))
    .pipe(useref(assets))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(gulpIf('*.php', htmlmin({collapseWhitespace: true, spare: true, empty: true, conditionals: true})))
    .pipe(gulp.dest(basePaths.build))

  // Copy All Other files except HTML, PHP, CSS e JS Files
  const allFiles = gulp
    .src([
      path.join(basePaths.dest, '**/*'),
      path.join(`!${paths.styles.dest}`, '**/*'),
      path.join(`!${paths.scripts.dest}`, '**/*'),
      path.join(`!${basePaths.dest}`, '**/*.{html,php}')
    ], {dot: true})
    .pipe(gulp.dest(basePaths.build))

  return merge(html, allFiles)
})

gulp.task('outdatedbrowser', () => {
  return gulp
    .src('node_modules/outdatedbrowser/outdatedbrowser/lang/*')
    .pipe(gulp.dest(path.join(basePaths.dest, 'lang/outdated_browser')))
})

// *************************** Utility Tasks ****************************** //

gulp.task('combine-assets', () => {
  const assets = {searchPath: basePaths.dest}

  // Minify and Copy HTML
  return gulp
    .src(path.join(basePaths.dest, '**/*.{html,php}'))
    .pipe(useref(assets))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulp.dest(basePaths.dest))
})

// Clean Directories
gulp.task('clean', cb => {
  const cleanPaths = [
    basePaths.build,
    paths.styles.dest,
    paths.scripts.dest,
    path.join(paths.styles.src, 'helpers/{_bitmap-sprite,_vetor-sprite}.{styl,scss}'),
    path.join(paths.images.dest, '**/*')
  ]

  return del(cleanPaths.concat(basePaths.clean.ignore), cb)
})

// ***************************** Main Tasks ******************************* //

// Serve the project and watch
gulp.task('serve', () => {
  browserSync(config.browserSync)

  gulp.watch(
    [
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg}'),
      path.join(`!${paths.sprite.src}`, '**/*')
    ],
    ['images', browserSync.reload]
  )

  gulp.watch(path.join(paths.sprite.src, '**/*.{png,gif}'), ['bitmap-sprite', browserSync.reload])

  gulp.watch(path.join(paths.sprite.src, '**/*.svg'), ['vetor-sprite', 'styles', browserSync.reload])

  gulp.watch(path.join(paths.images.dest, '**/*.svg'), ['svg2png', 'handlebars', browserSync.reload])

  gulp.watch(path.join(paths.scripts.src, '*.js'), ['scripts', browserSync.reload])

  gulp.watch(path.join(paths.scripts.src, 'settings/**/*.js'), browserSync.reload)

  gulp.watch(
    [
      path.join(paths.styles.src, '**/*.{styl,scss,sass}'),
      path.join(`!${paths.styles.src}`, 'helpers/{mixins,functions}/*.{styl,scss,sass}')
    ],
    ['styles', browserSync.reload]
  )

  gulp.watch(path.join(paths.styles.src, 'helpers/{mixins,functions}/*.{styl,scss,sass}'), ['styles-helpers'])

  gulp.watch(path.join(paths.html.src, '**/*.{html,hbs}'), ['handlebars'])

  gulp.watch(path.join(basePaths.dest, '**/*.{html,php,json}'), ['svg-inline', browserSync.reload])
})

// Serve the project
gulp.task('default', () => {
  sequence('handlebars', 'serve')
})

// Clean, compile and watch and serve the project
gulp.task('default:compile', () => {
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
