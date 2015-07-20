/*
*	Swill Boilerplate v4.0.0
*	https://github.com/tiagoporto/swill-boilerplate
*	Copyright (c) 2014-2015 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

//************************* Load dependencies ****************************//
var		   gulp = require('gulp'),
   autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
		  cache = require('gulp-cached'),
		 concat = require('gulp-concat'),
		   csso = require('gulp-csso'),
			del = require('del'),
		   file = require('gulp-file'),
		 gulpif = require('gulp-if'),
	   imagemin = require('gulp-imagemin'),
	   	 insert = require('gulp-insert'),
		 jshint = require('gulp-jshint'),
		  merge = require('merge-stream'),
	 minifyHTML = require('gulp-minify-html'),
		 notify = require('gulp-notify'),
		  newer = require('gulp-newer'),
		plumber = require('gulp-plumber'),
	   remember = require('gulp-remember'),
		replace = require('gulp-replace'),
		 rename = require('gulp-rename'),
	   sequence = require('run-sequence'),
	   sass = require('gulp-ruby-sass'),
	spritesmith = require('gulp.spritesmith'),
		svg2png = require('gulp-svg2png'),
	  svgSprite = require('gulp-svg-sprite'),
		stylish = require('jshint-stylish'),
		 stylus = require('gulp-stylus'),
		 uglify = require('gulp-uglify'),
		 useref = require('gulp-useref'),
		 args   = require('yargs').argv,
	  plugins = require('gulp-load-plugins')(),

//***************************** Path configs *****************************//
	basePaths = {
		   src: 'src/',
		  dest: 'public/',
		 build: 'build/',
		 bower: 'bower_components/',

		images: {
			 src: 'images/',
			dest: 'img/' // If change this directory remember to modify
						 // the variable $image-path in
						 // 'src/stylesheets/helpers/_variables.styl'
		},

		sprite: {
			bitmap: 'sprite/',
			   svg: 'svg-sprite/'
		},

		scripts: {
			 src: 'scripts/',
			dest: 'js/'
		},

		styles: {
			 src: 'stylesheets/',
			dest: 'css/'
		}
	},

	paths = {
		images: {
			  src: basePaths.src + basePaths.images.src ,
			 dest: basePaths.dest + basePaths.images.dest,
			build: basePaths.build + basePaths.images.src
		},

		sprite: {
			  bitmap: basePaths.src + basePaths.images.src + basePaths.sprite.bitmap,
			 svg: basePaths.src + basePaths.images.src + basePaths.sprite.svg
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
	},

//*********************** Preprocessor Select ***************************//
	preprocessor = 'stylus',

//************************ browserSync config ***************************//

	browserSyncConfig = {
		notify: false,
		port: 80,
		logPrefix: 'BrowserSync',
		// To use with dinamic files
		// proxy: 'localhost/swill-boilerplate/public/'
		server: {
			baseDir: [basePaths.src, basePaths.dest, basePaths.bower]
		}
	}


//****************************** Function ********************************//
//function getTask(task) {
	//return require('./tasks/' + task)(gulp, plugins, basePaths, paths);
//}


//******************************** Tasks *********************************//

//gulp.task('clean', getTask('clean'));
//gulp.task('copy-bower-dependencies', getTask('copy-bower-dependencies'));
//gulp.task('copy', getTask('copy'));
//gulp.task('dependence-scripts', getTask('dependence-scripts'));
//gulp.task('images', getTask('images'));
//gulp.task('png-sprite', getTask('png-sprite'));
//gulp.task('scripts', getTask('scripts'));
//gulp.task('styles-helpers', getTask('stylus-helpers'));
//gulp.task('styles', getTask('stylus'));
//gulp.task('svg-sprite', getTask('svg-sprite'));
//gulp.task('svg2png', getTask('svg2png'));
//gulp.task('watch', getTask('watch'));


// Generate Bitmap Sprite
gulp.task('bitmap-sprite', function () {
	var sprite = gulp.src(paths.sprite.bitmap + '**/*.png')
					.pipe(
						spritesmith({
							imgName: 'sprite.png',
							cssName: '_sprite.styl',
							imgPath: '../' + basePaths.images.dest + 'sprite.png',
							padding: 2,
							algorithm: 'top-down'
						})
					);

	sprite.img
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest));
	sprite.css
		.pipe(gulp.dest(paths.styles.src + 'helpers'))
		.pipe(notify({message: 'Bitmap sprite task complete', onLast: true}));

	return sprite;
});

// Generate SVG Sprite
gulp.task('svg-sprite', function() {
	return gulp.src(paths.sprite.svg + '*.svg')
				.pipe(plumber())
				.pipe(svgSprite({
					shape : {
						spacing : {
							padding : 2
						}
					},
					mode : {
						css : {
							dest : './',
							sprite: '../' + basePaths.images. dest + 'svg-sprite.svg',
							layout: 'vertical',
							bust : false,
							render : {
								styl : {dest: '../../' + paths.styles.src + 'helpers/_svg-sprite.styl'}
							}
						}
					}
				}))
				.pipe(gulp.dest(paths.images.dest))
				.pipe(notify({message: 'SVG sprite task complete', onLast: true}));
});

//Convert SVG to PNG
gulp.task('svg2png', function () {
	return gulp.src(paths.images.dest + 'svg-sprite.svg')
				.pipe(svg2png())
				.pipe(gulp.dest(paths.images.dest));
});

// Optimize Images
gulp.task('images', function () {
	var images =	gulp.src([
					paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
					'!' + paths.sprite.bitmap + '**/*',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(newer(paths.images.dest))
				.pipe(imagemin({optimizationLevel: 5, progressive: true}))
				.pipe(gulp.dest(paths.images.dest));

	var svg = gulp.src([
					paths.images.src + '**/*.svg',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(svg2png())
				.pipe(gulp.dest(paths.images.dest))
				.pipe(notify({message: 'Images task complete', onLast: true}));

	return merge(images, svg)
});

// Concatenate Stylus Mixins and Functions
gulp.task('stylus-helpers', function () {
	   var mixins = gulp.src(paths.styles.src + 'helpers/mixins/*.styl')
						.pipe(concat('_mixins.styl'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	var functions = gulp.src(paths.styles.src + 'helpers/functions/*.styl')
						.pipe(concat('_functions.styl'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	return merge(mixins, functions);
});

// Compile and Prefix Stylus
gulp.task('stylus', function () {

	return	gulp.src([
					paths.styles.src + '*.styl',
					'!' + paths.styles.src + '_*.styl',
				])
				.pipe(plumber())
				.pipe(stylus({'include css': true})
				    .on('error', function (err) {

						console.log(err.message);

						// If rename the stylus file change here
						file('styles.css', 'body:before{white-space: pre; font-family: monospace; content: "' + err.message + '";}', { src: true })
							.pipe(replace("\\",'/'))
							.pipe(replace(/(\r\n|\n|\r)/gm,'\\A '))
							.pipe(replace("\"",'\''))
							.pipe(replace("content: '",'content: "'))
							.pipe(replace("';}",'";}'))
							.pipe(gulp.dest(paths.styles.dest))
							.pipe(rename({suffix: '.min'}))
							.pipe(gulp.dest(paths.styles.dest));
					})
				)
				.pipe(autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(csso())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(notify({message: 'Styles task complete', onLast: true}));
});

// Compile and Prefix Sass Styles
gulp.task('sass', function () {
	return  sass(paths.styles.src + 'styles.scss', {precision: 3, style: 'expanded'})
				.pipe(autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.on('error', function (err) {
					console.error('Error', err.message);
				})
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(csso())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(notify({message: 'Styles task complete', onLast: true}));

});

// Concatenate dependencies scripts and Minify
gulp.task('dependence-scripts', function () {
	return	gulp.src([
					paths.scripts.src + 'dependencies/frameworks_libs/*',
					paths.scripts.src + 'dependencies/plugins/**'

				])
				.pipe(concat('dependencies.js'))
				.pipe(gulp.dest(paths.scripts.dest))
				.pipe(rename('dependencies.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate and Minify Main Scripts
gulp.task('scripts', function () {
	var concatenateJquery = gulp.src([
							'!' + paths.scripts.src + '**/_*.js',
							paths.scripts.src + 'jquery/*'
						])
						.pipe(cache('jquery'))
						.pipe(remember('jquery'))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(concat('jquery.js'))
						.pipe(insert.wrap('jQuery(document).ready(function($) {\n', '\n});'))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify(
						// Required to minify angularjs scripts
						// {mangle: false}
						))
						.pipe(gulp.dest(paths.scripts.dest));

	var concatenate = gulp.src([
							'!' + paths.scripts.src + '**/_*.js',
							paths.scripts.src + 'settings/outdatedbrowser.js',
							paths.scripts.src + 'settings/*.js',
							paths.scripts.src + '*.js',
							paths.scripts.src + 'jquery/onread/open_onread.js',
							paths.scripts.src + 'jquery/*',
							paths.scripts.src + 'jquery/onread/close_onread.js',
							paths.scripts.src + 'angular/**',
							paths.scripts.src + 'settings/google_analytics.js'
						])
						.pipe(cache('scripts'))
						.pipe(remember('scripts'))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(concat('main.js'))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify(
						// Required to minify angularjs scripts
						// {mangle: false}
						))
						.pipe(gulp.dest(paths.scripts.dest));

		   var copy = gulp.src([
							paths.scripts.src + 'angular/_*.js',
							paths.scripts.src + 'jquery/_*.js',
							paths.scripts.src + '/_*.js'
						])
						.pipe(newer(paths.scripts.dest))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(rename(function(path){
							path.basename = path.basename.substring(1)
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify({
							preserveComments: 'some'
							// Required to minify angularjs scripts
							//, mangle: false
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(notify({message: 'Scripts task complete', onLast: true}));

	return merge(concatenate, concatenateJquery, copy);
});

// Copy Files to Build
gulp.task('copy', function () {
	var assets   =  useref.assets({searchPath: [basePaths.bower, basePaths.dest]});

	// Minify and Copy HTML
	var  html    =   gulp.src(basePaths.dest + '**/*.{html,php}')
						.pipe(assets)
						.pipe(gulpif('*.js', uglify(
							// Required to minify angularjs scripts
							// {mangle: false}
						)))
						.pipe(gulpif('*.css', csso()))
						.pipe(assets.restore())
						.pipe(useref())
						.pipe(gulpif('*.html', minifyHTML({spare:true, empty: true})))
						.pipe(gulpif('*.php', minifyHTML({spare:true, empty: true})))
						.pipe(gulp.dest(basePaths.build));

	// Copy All Other files except HTML, PHP, CSS e JS Files
	var allFiles =	gulp.src([
							basePaths.dest + '**/*',
							'!' + paths.styles.dest + '**/*',
							'!' + paths.scripts.dest + '**/*',
							'!' + basePaths.dest + '**/*.{html,php}'
						], {dot: true})
						.pipe(gulp.dest(basePaths.build));
});

//*************************** Utility Tasks ******************************//



// Clean Directories
gulp.task('clean', function (cb) {
	del([
			basePaths.build,
			paths.styles.dest,
			paths.scripts.dest,
			paths.images.dest + '**/*',
			// Add here the folders that will not be deleted in public/img
			'!' + paths.images.dest + 'copyright{,**/*{,**/*}}',
			'!' + paths.images.dest + 'logos{,**/*{,**/*}}'
		], cb)
});

// Watch
gulp.task('watch', function () {
	browserSync(browserSyncConfig);

	// Watch .bmp .gif .jpg .jpeg .png and .svg files
	gulp.watch([
			paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
			'!' + paths.sprite.bitmap + '**/*',
			'!' + paths.sprite.svg + '**/*'],

			['images', browserSync.reload]
		 );

	// Watch bitmap sprite files
	gulp.watch(
			paths.sprite.bitmap + '**/*.{png,jpg,gif}',

			['bitmap-sprite', browserSync.reload]
		);

	// Watch svg sprite files
	gulp.watch(
			paths.sprite.svg + '**/*.svg',

			['svg-sprite', 'stylus', browserSync.reload]
		);

	// Watch svg sprite generate
	gulp.watch(
			paths.images.dest + 'svg-sprite.svg',

			['svg2png', browserSync.reload]
		);

	// Watch .js files
	gulp.watch([
			paths.scripts.src + '**/*.js',
			'!' + paths.scripts.src + 'dependencies/**/*.js'],

			['scripts', browserSync.reload]
		);

	// Watch dependencies .js files
	gulp.watch(
			paths.scripts.src + 'dependencies/**/*.js',

			['dependence-scripts', browserSync.reload]
		);

	// Watch .styl files
	gulp.watch([
			paths.styles.src + '**/*.{styl,css}',
			'!' + paths.styles.src + 'helpers/mixins/*.styl',
			'!' + paths.styles.src + 'helpers/functions/*.styl'],

			['stylus', browserSync.reload]
		);

	// Watch .styl Helpers and Functions files
	gulp.watch([
			paths.styles.src + 'helpers/mixins/*.styl',
			paths.styles.src + 'helpers/functions/*.styl'],

			['stylus-helpers']
		);

	//Watch .html and .php Files
	gulp.watch(
			basePaths.dest + '**/*.{html,php}',

			browserSync.reload
		);
});

// Copy Bower dependencies to specific folders
gulp.task('bower', function() {

	var outdatedBrowserLangs = gulp.src(basePaths.bower + 'outdated-browser/outdatedbrowser/lang/*')
						.pipe(gulp.dest(basePaths.dest + 'lang/outdated_browser'));

	var    fonts    = gulp.src([
							basePaths.bower + 'bootstrap/dist/fonts/*',
							basePaths.bower + 'font-awesome/fonts/*'
						])
						.pipe(gulp.dest(basePaths.dest + 'fonts'));

	return merge(outdatedBrowserLangs, fonts);
});


gulp.task('set-preprocessor', function(){
	gulp.src(['gulpfile.js'])
	    .pipe(replace(/preprocessor\s=\s'[a-z]{4,6}/g, "preprocessor = \'" + args.preprocessor))
	    .pipe(gulp.dest('./'));
});

gulp.task('folder-preprocessor', function(){
	gulp.src(paths.styles.src + args.preprocessor + "/*")
		.pipe(gulp.dest(paths.styles.src));
});

gulp.task('remove-preprocessors', function(cb){
	del([
		paths.styles.src + "sass",
		paths.styles.src + "stylus",
		paths.styles.src + "less"
		], cb)
});


gulp.task('setup', function(cb){
	sequence(['set-preprocessor', 'folder-preprocessor', 'remove-preprocessors'], cb);
});

//***************************** Main Tasks *******************************//

// Compile, watch and serve project
gulp.task('default', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'svg-sprite', 'stylus-helpers', 'dependence-scripts'], 'svg2png', preprocessor, 'scripts', 'watch',  cb);
});

// Serve the project and watch
gulp.task('serve', ['watch']);

// Compile project
gulp.task('compile', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'svg-sprite', 'stylus-helpers', 'dependence-scripts'], 'svg2png', preprocessor, 'scripts', cb);
});

// Build Project
gulp.task('build', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'svg-sprite'], 'svg2png', 'stylus-helpers', preprocessor, 'dependence-scripts', 'scripts', 'copy', cb);
});

// Build and serve builded project
gulp.task('build:serve', ['build'], function (cb) {
	browserSync({
		notify: false,
		port: 80,
		logPrefix: 'BrowserSync',
		// To use with dinamic files
		// proxy: 'localhost/swill-boilerplate/public/'
		server: {
			baseDir: [basePaths.build]
		}
	});
});