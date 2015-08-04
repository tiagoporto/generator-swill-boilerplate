/*
*	Swill Boilerplate v4.0.0beta
*	https://github.com/tiagoporto/swill-boilerplate
*	Copyright (c) 2014-2015 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

'use strict';

var		 gulp = require('gulp'),
  browserSync = require('browser-sync'),
		  del = require('del'),
		   fs = require('fs'),
		merge = require('merge-stream'),
   minifyHTML = require('gulp-minify-html'),
	 sequence = require('run-sequence'),
  spritesmith = require('gulp.spritesmith'),
	svgSprite = require('gulp-svg-sprite'),
	  stylish = require('jshint-stylish'),
	  wrapper = require('gulp-wrapper'),
		 args = require('yargs').argv,
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
			bitmap: 'png-sprite/',
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

//******************************* Settings *******************************//
	 preprocessor = 'stylus',
		   jquery = true,
		  lintCSS = false,
		   lintJS = true,
	headerProject = fs.readFileSync(basePaths.src + "header-comments.txt", "utf8"),

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


// Generate Bitmap Sprite
gulp.task('bitmap-sprite', function () {
	if(preprocessor === "sass"){
		var outputFile = "scss";
	}else if(preprocessor === "stylus"){
		var outputFile = "styl";
	}else if(preprocessor === "less"){
		var outputFile = "less";
	};
	var sprite = gulp.src(paths.sprite.bitmap + '**/*.png')
					.pipe(
						spritesmith({
							imgName: 'bitmap-sprite.png',
							cssName: "_bitmap-sprite." + outputFile,
							imgPath: '../' + basePaths.images.dest + 'bitmap-sprite.png',
							padding: 2,
							algorithm: 'top-down'
						})
					);

	sprite.img
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(paths.images.dest));
	sprite.css
		.pipe(gulp.dest(paths.styles.src + 'helpers'))
		.pipe(plugins.notify({message: 'Bitmap sprite task complete', onLast: true}));

	return sprite;
});

// Generate SVG Sprite
gulp.task('vetor-sprite', function() {
	if(preprocessor === "sass"){
		var output = "scss";
	}else if(preprocessor === "stylus"){
		var output = "styl";
	}else if(preprocessor === "less"){
		var output = "less";
	};

	var spriteOptions = {
					shape : {
						spacing : {
							padding : 2
						}
					},
					mode : {
						css : {
							dest : './',
							sprite: '../' + basePaths.images.dest + 'vetor-sprite.svg',
							layout: 'vertical',
							bust : false,
							render : {}
						},
					}
				};

	spriteOptions.mode.css.render[output] =  {};

	spriteOptions.mode.css.render[output].dest =  '../../' + paths.styles.src + 'helpers/_vetor-sprite.' + output;

	return gulp.src(paths.sprite.svg + '*.svg')
				.pipe(plugins.plumber())
				.pipe(svgSprite(spriteOptions))
				.pipe(gulp.dest(paths.images.dest))
				.pipe(plugins.notify({message: 'SVG sprite task complete', onLast: true}));
});

//Fallback convert SVG to PNG
gulp.task('svg2png', function () {
	return gulp.src(paths.images.dest + 'vetor-sprite.svg')
				.pipe(plugins.svg2png())
				.pipe(gulp.dest(paths.images.dest));
});

// Optimize Images
gulp.task('images', function () {
	var images =	gulp.src([
					paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
					'!' + paths.sprite.bitmap + '**/*',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(plugins.newer(paths.images.dest))
				.pipe(plugins.imagemin({optimizationLevel: 5, progressive: true}))
				.pipe(gulp.dest(paths.images.dest));

	var svg = gulp.src([
					paths.images.src + '**/*.svg',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(plugins.svg2png())
				.pipe(gulp.dest(paths.images.dest))
				.pipe(plugins.notify({message: 'Images task complete', onLast: true}));

	return merge(images, svg)
});



// Concatenate Stylus Mixins and Functions
gulp.task('stylus-helpers', function () {
	   var mixins = gulp.src(paths.styles.src + 'helpers/mixins/*.styl')
						.pipe(plugins.concat('_mixins.styl'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	var functions = gulp.src(paths.styles.src + 'helpers/functions/*.styl')
						.pipe(plugins.concat('_functions.styl'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	return merge(mixins, functions);
});

// Compile and Prefix Stylus
gulp.task('stylus', function () {

	return	gulp.src([
					paths.styles.src + '*.styl',
					'!' + paths.styles.src + '_*.styl',
				])
				.pipe(plugins.plumber())
				.pipe(plugins.stylus({'include css': true})
					.on('error', function (err) {

						console.log(err.message);

						// If rename the stylus file change here
						plugins.file('styles.css', 'body:before{white-space: pre; font-family: monospace; content: "' + err.message + '";}', { src: true })
							.pipe(plugins.replace("\\",'/'))
							.pipe(plugins.replace(/(\r\n|\n|\r)/gm,'\\A '))
							.pipe(plugins.replace("\"",'\''))
							.pipe(plugins.replace("content: '",'content: "'))
							.pipe(plugins.replace("';}",'";}'))
							.pipe(gulp.dest(paths.styles.dest))
							.pipe(plugins.rename({suffix: '.min'}))
							.pipe(gulp.dest(paths.styles.dest));
					})
				)
				.pipe(plugins.autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.pipe(wrapper({
					header: headerProject
				}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(plugins.csso())
				.pipe(plugins.rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(plugins.notify({message: 'Styles task complete', onLast: true}));
});

// Compile and Prefix Sass Styles
gulp.task('sass', function () {
	return  plugins.sass(paths.styles.src + 'styles.scss', {precision: 3, style: 'expanded'})
				.pipe(plugins.autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.pipe(wrapper({
					header: headerProject
				}))
				.on('error', function (err) {
					console.error('Error', err.message);
				})
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(plugins.csso())
				.pipe(plugins.rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(plugins.notify({message: 'Styles task complete', onLast: true}));

});

// Compile and Prefix Less Styles
gulp.task('less', function () {
	return gulp.src(paths.styles.src + '**/*.less')
		.pipe(plugins.less())
		.pipe(plugins.autoprefixer({
				browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
		}))
		.pipe(wrapper({
			header: headerProject
		}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.csso())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(plugins.notify({message: 'Styles task complete', onLast: true}));

});




// Concatenate dependencies scripts and Minify
gulp.task('dependence-scripts', function () {
	return gulp.src([
					paths.scripts.src + 'settings/google_analytics.js',
					paths.scripts.src + 'dependencies/frameworks_libs/*',
					paths.scripts.src + 'dependencies/plugins/**',
					paths.scripts.src + 'settings/*.js'
				])
				.pipe(plugins.concat('dependencies.js'))
				.pipe(gulp.dest(paths.scripts.dest))
				.pipe(plugins.rename('dependencies.min.js'))
				.pipe(plugins.uglify())
				.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate and Minify Main Scripts
gulp.task('scripts', function () {
	var concatenate = gulp.src([
							'!' + paths.scripts.src + '**/_*.js',
							paths.scripts.src + '*.js'
						])
						.pipe(plugins.cached('scripts'))
						.pipe(plugins.remember('scripts'))
						.pipe(plugins.plumber())
						.pipe(plugins.if(lintJS, plugins.jshint()))
						.pipe(plugins.if(lintJS, plugins.jshint.reporter('jshint-stylish')))
						.pipe(plugins.concat('main.js'))
						.pipe( plugins.if(jquery,
							wrapper({
								header: 'jQuery(document).ready(function($) {\n\n',
								footer: '\n});'
							})
						))
						.pipe(wrapper({
							header: headerProject
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(plugins.rename({suffix: '.min'}))
						.pipe(plugins.uglify())
						.pipe(gulp.dest(paths.scripts.dest));


		   var copy = gulp.src([
							paths.scripts.src + '/_*.js'
						])
						.pipe(plugins.newer(paths.scripts.dest))
						.pipe(plugins.plumber())
						.pipe(plugins.if(lintJS, plugins.jshint()))
						.pipe(plugins.if(lintJS, plugins.jshint.reporter('jshint-stylish')))
						.pipe(plugins.rename(function(path){
							path.basename = path.basename.substring(1)
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(plugins.rename({suffix: '.min'}))
						.pipe(plugins.uglify({
							preserveComments: 'some'
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(plugins.notify({message: 'Scripts task complete', onLast: true}));

	return merge(concatenate, copy);
});

// Copy Files to Build
gulp.task('copy', function () {
	var assets   =  plugins.useref.assets({searchPath: [basePaths.bower, basePaths.dest]});

	// Minify and Copy HTML
	var  html    =   gulp.src(basePaths.dest + '**/*.{html,php}')
						.pipe(assets)
						.pipe(plugins.if('*.js', plugins.uglify()))
						.pipe(plugins.if('*.css', plugins.csso()))
						.pipe(assets.restore())
						.pipe(plugins.useref())
						.pipe(plugins.if('*.html', minifyHTML({spare:true, empty: true})))
						.pipe(plugins.if('*.php', minifyHTML({spare:true, empty: true})))
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

gulp.task('set-preprocessor', function(){
	if(args.preprocessor){
		return gulp.src(['gulpfile.js'])
			.pipe(plugins.replace(/preprocessor\s=\s'[a-z]{4,6}/g, "preprocessor = \'" + args.preprocessor))
			.pipe(gulp.dest('./'));
	}
});

gulp.task('folder-preprocessor', function(){
	if(args.preprocessor){
		return gulp.src(paths.styles.src + args.preprocessor + "/**/*")
			.pipe(gulp.dest(paths.styles.src));
	}
});

gulp.task('remove-preprocessors', function(cb){
	if(args.preprocessor){
		del([
			paths.styles.src + "sass",
			paths.styles.src + "stylus",
			paths.styles.src + "less"
			], cb)
	}
});

gulp.task('set-jquery', function(){
	if(args.jquery){
		return gulp.src(['gulpfile.js'])
			.pipe(plugins.replace(/jquery\s=\s[a-z]{0,9},/g, "jquery = " + args.jquery + ","))
			.pipe(gulp.dest('./'));
	}
});

gulp.task('set-lintJS', function(){
	if(args.lintJS){
		return gulp.src(['gulpfile.js'])
			.pipe(plugins.replace(/lintJS\s=\s[a-z]{0,9},/g, "lintJS = " + args.lintJS + ","))
			.pipe(gulp.dest('./'));
	}
});

//*************************** Utility Tasks ******************************//

gulp.task('combine-assets', function () {
	var assets   =  plugins.useref.assets({searchPath: [basePaths.bower, basePaths.dest]});

	// Minify and Copy HTML
	return  gulp.src(basePaths.dest + '**/*.{html,php}')
					.pipe(assets)
					.pipe(plugins.if('*.js', plugins.uglify()))
					.pipe(plugins.if('*.css', plugins.csso()))
					.pipe(assets.restore())
					.pipe(plugins.useref())
					.pipe(gulp.dest(basePaths.dest));
});

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

// Watch Files
gulp.task('watch', function () {
	browserSync(browserSyncConfig);

	gulp.watch([
			paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
			'!' + paths.sprite.bitmap + '**/*',
			'!' + paths.sprite.svg + '**/*'],

			['images', browserSync.reload]
		 );

	gulp.watch(
			paths.sprite.bitmap + '**/*.{png,gif}',

			['bitmap-sprite', browserSync.reload]
		);

	gulp.watch(
			paths.sprite.svg + '**/*.svg',

			['vetor-sprite', preprocessor, browserSync.reload]
		);

	gulp.watch(
			paths.images.dest + 'vetor-sprite.svg',

			['svg2png', browserSync.reload]
		);

	gulp.watch(
			paths.scripts.src + '*.js',

			['scripts', browserSync.reload]
		);

	gulp.watch([
				paths.scripts.src + 'dependencies/**/*.js',
				paths.scripts.src + 'settings/**/*.js'
			],

			['dependence-scripts', browserSync.reload]
		);

	gulp.watch([
			paths.styles.src + '**/*.{styl,scss,sass,less}',
			'!' + paths.styles.src + 'helpers/mixins/*.{styl,scss,sass,less}',
			'!' + paths.styles.src + 'helpers/functions/*.{styl,scss,sass,less}'],

			[preprocessor, browserSync.reload]
		);

	gulp.watch([
			paths.styles.src + 'helpers/mixins/*.{styl,scss,sass,less}',
			paths.styles.src + 'helpers/functions/*.{styl,scss,sass,less}'],

			['stylus-helpers']
		);

	gulp.watch(
			basePaths.dest + '**/*.{html,php}',

			browserSync.reload
		);
});

// Copy Bower dependencies to public folder
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


gulp.task('setup', function(cb){
	sequence('set-jquery', 'set-lintJS', 'set-preprocessor', 'folder-preprocessor', 'remove-preprocessors', cb);
});

//***************************** Main Tasks *******************************//

// Compile, watch and serve project
gulp.task('default', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'stylus-helpers', 'dependence-scripts'], 'svg2png', preprocessor, 'scripts', 'watch',  cb);
});

// Serve the project and watch
gulp.task('serve', ['watch']);

// Compile project
gulp.task('compile', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'stylus-helpers', 'dependence-scripts'], 'svg2png', preprocessor, 'scripts', cb);
});

// Build Project
gulp.task('build', ['clean'], function (cb) {
	sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'stylus-helpers', 'dependence-scripts'], 'svg2png', preprocessor, 'scripts', 'copy', cb);
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
