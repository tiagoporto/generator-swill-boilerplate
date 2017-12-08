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
const config = require('./.swillrc.json')
const csslint = require('gulp-csslint')
const csso = require('gulp-csso')
const del = require('del')
const eslint = require('gulp-eslint')
const file = require('gulp-file')
const ghPages = require('gulp-gh-pages')
const gulp = require('gulp')
const gulpIf = require('gulp-if')<% if (use.workflow === 'handlebars') { %>
const handlebars = require('gulp-hb')<% } %>
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')<% if (use.inlineSVG) { %>
const inline = require('gulp-inline')<% } %>
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
const svgSprite = require('gulp-svg-sprite')
const uglify = require('gulp-uglify')
const useref = require('gulp-useref')
const w3cjs = require('gulp-w3cjs')

console.log('\x1b[32m', '\x1b[7m', 'Init Swill Boilerplate v<%= boilerplate.version %>', '\x1b[0m')

// ***************************** Path configs ***************************** //

const paths = config.basePaths

paths.images = {
  src: path.join(paths.src, paths.images),
  dist: path.join(paths.dist, paths.images),
  build: path.join(paths.build, paths.images)
}

paths.scripts = {
  src: path.join(paths.src, paths.scripts),
  dist: path.join(paths.dist, paths.scripts),
  build: path.join(paths.build, paths.scripts)
}

paths.styles = {
  src: path.join(paths.src, paths.styles),
  dist: path.join(paths.dist, paths.styles),
  build: path.join(paths.build, paths.styles)
}

// ******************************* Settings ******************************* //

const destFolder = process.argv[process.argv.length - 1] === '--prod' ? 'build' : 'dist'

const fileFormats = {
  images: 'bmp,gif,jpg,jpeg,png,svg,eps,webp,tiff',
  scripts: 'js,jsx,vue',
  styles: 'styl,sass,scss,css',
  handlebars: 'html,hbs'
}

// ******************************** Tasks ********************************* //

gulp.task('html', () => {
  return gulp<% if (use.workflow === 'handlebars') { %>
    .src([
      path.join(paths.src, '**/*.html'),
      path.join(`!${paths.src}`, 'lang/outdated_browser/**/*.html')
    ])
    .pipe(plumber())
    .pipe(handlebars({
      partials: path.join(paths.src, 'includes/**/*.hbs')
    }))
    .pipe(gulpIf(config.validateW3C, w3cjs()))
    .pipe(gulpIf(config.inlineSVG, gulp.dest(paths[destFolder])))<% if (use.inlineSVG) { %>
    .pipe(gulpIf(config.inlineSVG, inline({
      base: './',
      disabledTypes: ['css', 'js', 'img']
    })))
    .pipe(gulp.dest(paths[destFolder]))
<% } %>    .pipe(notify({message: 'Handlebars task complete', onLast: true}))<% } %><% if (use.workflow === 'static') { %>
    .src([
      path.join(paths.src, '**/*.html'),
      path.join(`!${paths.src}`, 'lang/outdated_browser/**/*.html')
    ])
    .pipe(plumber())
    .pipe(gulpIf(config.validateW3C, w3cjs()))
    .pipe(gulp.dest(paths[destFolder]))
    .pipe(notify({message: 'HTML task complete', onLast: true}))<% } %>
})

// ========= Scripts ========= //

// Lint Script
gulp.task('scripts:lint', () => {
  return gulp
    .src(path.join(paths.src, '**/*.{js,jsx,vue}'))
    .pipe(gulpIf(config.lintJS, eslint()))
    .pipe(gulpIf(config.lintJS, eslint.format()))
})

// Compile, Minify and Lint Script
gulp.task('scripts', ['scripts:lint'], () => {
  if (paths.optionalScripts) {
    return gulp
      .src(paths.optionalScripts)
      .pipe(plumber())
      .pipe(newer(paths[destFolder]))
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest(paths[destFolder]))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify({output: {comments: 'some'}}))
      .pipe(gulp.dest(paths[destFolder]))
      .pipe(notify({message: 'Scripts task complete', onLast: true}))
  }

  return
})

// ========= Styles ========= //

gulp.task('styles:lint', () => {
  return gulp
    .src([
      path.join(paths.src, '*.styl'),
      path.join(paths.src, 'index.scss')
    ])
    .pipe(gulpIf(config.lintCSS, csslint('./.csslintrc')))
    .pipe(gulpIf(config.lintCSS, csslint.formatter()))
})

gulp.task('styles', ['styles:lint'], () => {<% if (preprocessor.name === "stylus") { %>
  const streaming = src => {
    return src
      .pipe(plumber())
      .pipe(
        stylus({
          'include': [
            'node_modules'
          ],
          'include css': true
        })
          .on('error', err => {
            console.log(err.message)
            // If rename the stylus file change here
            file('styles.css', `body:before{white-space: pre; font-family: monospace; content: "${err.message}";}`, {src: true})
              .pipe(replace('\\', '/'))
              .pipe(replace(/\n/gm, '\\A '))
              .pipe(replace('"', '\''))
              .pipe(replace("content: '", 'content: "'))
              .pipe(replace('\';}', '";}'))
              .pipe(gulp.dest(paths[destFolder]))
              .pipe(rename({suffix: '.min'}))
              .pipe(gulp.dest(paths[destFolder]))
          }))
      .pipe(autoprefixer({browsers: config.autoprefixerBrowsers}))
      .pipe(mergeMediaQueries({log: true}))
      .pipe(gulp.dest(paths[destFolder]))
      .pipe(csso())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths[destFolder]))
      .pipe(notify({message: 'Styles task complete', onLast: true}))
  }

  const main = streaming(
    gulp.src([
      path.join(paths.src, 'index.styl'),
      path.join(`!${paths.src}`, '**/_*.styl')
    ])
  )

  const others = streaming(
    gulp.src([
      path.join(paths.src, '**/*.styl'),
      path.join(`!${paths.src}`, 'index.styl'),
      path.join(`!${paths.src}`, '**/_*.styl')
    ])
      .pipe(newer({dest: paths[destFolder], ext: '.css', extra: paths.styles.src}))
  )

  return merge(main, others)<% } %><% if (preprocessor.name === "sass") { %>
  return gulp
    .src(path.join(paths.styles.src, 'styles.scss'))
    .pipe(plumber())
    .pipe(sass({
      precision: 3,
      outputStyle: 'expanded',
      includePaths: [
        'node_modules'
      ]
    })
      .on('error', sass.logError)
    )
    .pipe(autoprefixer({browsers: config.autoprefixerBrowsers}))
    .pipe(mergeMediaQueries({log: true}))
    .pipe(gulp.dest(paths[destFolder]))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths[destFolder]))
    .pipe(notify({message: 'Styles task complete', onLast: true}))<% } %>
})

gulp.task('styles-helpers', () => {
  return gulp
    .src([
      path.join(paths.styles.src, 'helpers/mixins/*.<%= preprocessor.extension %>'),
      path.join(paths.styles.src, 'helpers/functions/*.<%= preprocessor.extension %>')
    ])
    .pipe(plumber())
    .pipe(concat('_helpers.<%= preprocessor.extension %>'))
    .pipe(gulp.dest(path.join(paths.styles.src, 'helpers')))
})

// ========= Images ========= //

// Optimize Images
gulp.task('images', () => {
  return gulp
    .src([
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg,eps}'),
      path.join(`!${paths.images.src}`, 'sprite/**/*')
    ])
    .pipe(plumber())
    .pipe(newer(paths.images[destFolder]))
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ], {
      verbose: true
    }
    ))
    .pipe(gulp.dest(paths.images[destFolder]))
})

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', () => {
  const sprite = gulp
    .src(path.join(paths.images.src, 'sprite/**/*.png'))
    .pipe(plumber())
    .pipe(
      spritesmith({
        imgName: 'bitmap-sprite.png',
        cssName: '_bitmap-sprite.<%= preprocessor.extension %>',
        cssOpts: {
          cssSelector: item => {
            if (item.name.indexOf('~hover') !== -1) {
              return `.icon-${item.name.replace('~hover', ':hover')}`
            } else {
              return `.icon-${item.name}`
            }
          }
        },
        imgPath: path.join('../', paths.images[destFolder], 'bitmap-sprite.png'),
        padding: 2,
        algorithm: 'top-down'
      })
    )

  sprite.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images[destFolder]))

  sprite.css
    .pipe(gulp.dest(path.join(paths.styles.src, 'helpers')))
    .pipe(notify({message: 'Bitmap sprite task complete', onLast: true}))

  return sprite
})

// Generate SVG Sprite
gulp.task('vector-sprite', () => {
  return gulp
    .src(path.join(paths.images.src, 'sprite/*.svg'))
    .pipe(plumber())
    .pipe(svgSprite({
      shape: {
        spacing: {padding: 2}
      },
      mode: {
        css: {
          prefix: `${config.svgPrefixClass}%s`,
          dest: './',
          sprite: 'vector-sprite.svg',
          layout: 'vertical',
          bust: false,
          render: {
            <%= preprocessor.extension %>: {
              dest: path.join('../../', paths.styles.src, 'helpers/_vector-sprite.<%= preprocessor.extension %>')
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(paths.images[destFolder]))
    .pipe(notify({message: 'SVG sprite task complete', onLast: true}))
})

gulp.task('copy', () => {
<% if (use.outdatedBrowser) { %>  const outdatedbrowser = gulp
    .src('node_modules/outdatedbrowser/outdatedbrowser/lang/*')
    .pipe(gulp.dest(path.join(paths[destFolder], 'lang/outdated_browser')))

  const allFiles = <% } %><% if (!use.outdatedBrowser) { %>  return <% } %>gulp
    .src([
      path.join(paths.src, '**/*'),
      path.join(`!${paths.src}`, '{**/.gitkeep,**/*.{html,css,js,bmp,gif,jpg,jpeg,png,svg,eps,styl,sass,scss}}')
    ], {dot: true, nodir: true})
    .pipe(gulp.dest(paths[destFolder]))<% if (use.outdatedBrowser) { %>

  return merge(outdatedbrowser, allFiles)<% } %>
})

// *************************** Utility Tasks ****************************** //

// Clean Directories
gulp.task('clean', () => {
  return del(paths[destFolder])
})

// Serve the project and watch
gulp.task('watch', callback => {
  const bsConfig = config.browserSync
  bsConfig.server.baseDir.indexOf(`${paths.dist}/`) && bsConfig.server.baseDir.push(`${paths.dist}/`)

  browserSync(bsConfig)

  // Images
  gulp.watch(
    [
      path.join(paths.images.src, '**/*.{bmp,gif,jpg,jpeg,png,svg}'),
      path.join(`!${paths.images.src}`, 'sprite/**/*')
    ],
    ['images', browserSync.reload]
  )

  // Sprite
  gulp.watch(path.join(paths.images.src, 'sprite/**/*.{png,gif}'), ['bitmap-sprite', browserSync.reload])

  gulp.watch(path.join(paths.images.src, 'sprite/**/*.svg'), ['vector-sprite', 'styles', browserSync.reload])

  // Scripts
  gulp.watch(path.join(paths.src, '**/*.{js,jsx}'), ['scripts'])

  gulp.watch(path.join(paths.dist, '*.js'), browserSync.reload)

  // Styles
  gulp.watch(
    [
      path.join(paths.src, '**/*.{styl,scss,sass}'),
      path.join(`!${paths.styles.src}`, 'helpers/{mixins,functions}/*.{styl,scss,sass}')
    ],
    ['styles', browserSync.reload]
  )

  gulp.watch(path.join(paths.styles.src, 'helpers/{mixins,functions}/*.{styl,scss,sass}'), ['styles-helpers'])

  // HTML
  gulp.watch(path.join(paths.src, '**/*.{html,hbs}'), ['html', browserSync.reload])

  // Other files
  gulp.watch(
    [
      path.join(paths.src, '**/*'),
      path.join(`!${paths.src}`, '**/*.{html,css,js,bmp,gif,jpg,jpeg,png,svg,eps,styl,sass,scss}')
    ],
    ['copy', browserSync.reload]
  )

  callback()
})

// ***************************** Main Tasks ******************************* //

// Clean and compile the project
gulp.task('compile', ['clean'], callback => {
  sequence(
    [
      'copy',
      'html',
      'images',
      'bitmap-sprite',
      'vector-sprite',
      'styles-helpers'
    ],
    'styles',
    'scripts',
    callback
  )
})

// Clean, compile, serve and watch the project
gulp.task('compile:watch', callback => {
  sequence('compile', 'watch', callback)
})

// Build Project
gulp.task('build', ['compile'], () => {
  const html = gulp
    .src(path.join(paths.src, '**/*.html'))
    .pipe(useref({searchPath: destFolder}))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulpIf('*.html', htmlmin({
      collapseWhitespace: true,
      spare: true,
      empty: true,
      conditionals: true
    })))
    .pipe(gulp.dest(paths[destFolder]))

  // Copy All Other files except HTML, CSS e JS Files
  const allFiles = gulp
    .src([
      path.join(paths.src, '**/*'),
      path.join(`!${paths.styles[destFolder]}`, '**/*'),
      path.join(`!${paths.scripts[destFolder]}`, '**/*'),
      path.join(`!${destFolder}`, '**/*.html')
    ], {dot: true, nodir: true})
    .pipe(gulp.dest(paths[destFolder]))

  return merge(html, allFiles)
})

// Build Project and serve
gulp.task('build:serve', ['build'], () => {
  const bsConfig = config.browserSyncBuild
  bsConfig.server.baseDir.indexOf(`${paths.build}/`) && bsConfig.server.baseDir.push(`${paths.build}/`)

  browserSync(bsConfig)
})

// Build the project and push the builded folder to gh-pages branch
gulp.task('gh-pages', ['build'], () => {
  return gulp
    .src(path.join(paths.build, '**/*'))
    .pipe(ghPages())
})
