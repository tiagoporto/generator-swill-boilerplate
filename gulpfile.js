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
		 sass = require('gulp-ruby-sass'),
  spritesmith = require('gulp.spritesmith'),
	svgSprite = require('gulp-svg-sprite'),
	  stylish = require('jshint-stylish'),
		 args = require('yargs').argv,
	  plugins = require('gulp-load-plugins')(),
	   config = require('./config.json'),

//***************************** Path configs *****************************//

basePaths = config.basePaths,

paths = {
		images: {
			  src: basePaths.src + basePaths.images.src ,
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
	},

//******************************* Settings *******************************//
	 preprocessor = 'stylus',
   extensionStyle = '',
	headerProject = fs.readFileSync(basePaths.src + "header-comments.txt", "utf8")

	if(preprocessor === "sass"){
		extensionStyle = "scss";
	}else if(preprocessor === "stylus"){
		extensionStyle = "styl";
	}else if(preprocessor === "less"){
		extensionStyle = preprocessor;
	}


//******************************** Tasks *********************************//

gulp.task('styles-helpers', require('./tasks/' + preprocessor + '-helpers')(gulp, plugins, paths, merge));

gulp.task('styles', require('./tasks/' + preprocessor)(gulp, plugins, paths, headerProject, config.autoprefixerBrowsers, config.lintCSS, sass));

// Generate Bitmap Sprite
gulp.task('bitmap-sprite', function () {
	var sprite = gulp.src(paths.sprite.src + '**/*.png')
					.pipe(
						spritesmith({
							imgName: 'bitmap-sprite.png',
							cssName: "_bitmap-sprite." + extensionStyle,
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

	spriteOptions.mode.css.render[extensionStyle] =  {};

	spriteOptions.mode.css.render[extensionStyle].dest =  '../../' + paths.styles.src + 'helpers/_vetor-sprite.' + extensionStyle;

	return gulp.src(paths.sprite.src + '*.svg')
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
	var images = gulp.src([
					paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
					'!' + paths.sprite.src + '**/*',
				])
				.pipe(plugins.newer(paths.images.dest))
				.pipe(plugins.imagemin({optimizationLevel: 5, progressive: true}))
				.pipe(gulp.dest(paths.images.dest));

	var svg = gulp.src([
					paths.images.src + '**/*.svg',
					'!' + paths.sprite.src + '**/*'
				])
				.pipe(plugins.newer(paths.images.dest))
				.pipe(plugins.svg2png())
				.pipe(gulp.dest(paths.images.dest))
				.pipe(plugins.notify({message: 'Images task complete', onLast: true}));

	return merge(images, svg)
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
						.pipe(plugins.if(config.lintJS, plugins.jshint()))
						.pipe(plugins.if(config.lintJS, plugins.jshint.reporter('jshint-stylish')))
						.pipe(plugins.concat('scripts.js'))
						.pipe( plugins.if(
							config.jquery,
							plugins.wrapper({
								header: 'jQuery(document).ready(function($) {\n\n',
								footer: '\n});'
							})
						))
						.pipe(plugins.wrapper({
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
						.pipe(plugins.if(config.lintJS, plugins.jshint()))
						.pipe(plugins.if(config.lintJS, plugins.jshint.reporter('jshint-stylish')))
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
	var  assets  = plugins.useref.assets({searchPath: [basePaths.bower, basePaths.dest]});

	// Minify and Copy HTML
	var  html    = gulp.src(basePaths.dest + '**/*.{html,php}')
						.pipe(assets)
						.pipe(plugins.if('*.js', plugins.uglify()))
						.pipe(plugins.if('*.css', plugins.csso()))
						.pipe(assets.restore())
						.pipe(plugins.useref())
						.pipe(plugins.if('*.html', minifyHTML({spare:true, empty: true})))
						.pipe(plugins.if('*.php', minifyHTML({spare:true, empty: true})))
						.pipe(gulp.dest(basePaths.build));

	// Copy All Other files except HTML, PHP, CSS e JS Files
	var allFiles = gulp.src([
							basePaths.dest + '**/*',
							'!' + paths.styles.dest + '**/*',
							'!' + paths.scripts.dest + '**/*',
							'!' + basePaths.dest + '**/*.{html,php}'
						], {dot: true})
						.pipe(gulp.dest(basePaths.build));
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

//Set the preprocessor in variable
gulp.task('set-preprocessor', function(){
	if(args.preprocessor){
		return gulp.src(['gulpfile.js'])
			.pipe(plugins.replace(/preprocessor\s=\s'[a-z]{4,6}/g, "preprocessor = \'" + args.preprocessor))
			.pipe(gulp.dest('./'));
	}
});

//Copy the files to use
gulp.task('folder-preprocessor', function(){
	if(args.preprocessor){
		return gulp.src(paths.styles.src + args.preprocessor + "/**/*")
			.pipe(gulp.dest(paths.styles.src));
	}
});

//Removes unnecessary folders
gulp.task('remove-preprocessors', function(cb){
	if(args.preprocessor){
		del([
			paths.styles.src + "sass",
			paths.styles.src + "stylus",
			paths.styles.src + "less"
			], cb)
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

gulp.task('setup', function(cb){
	sequence('bower', 'set-preprocessor', 'folder-preprocessor', 'remove-preprocessors', cb);
});

//***************************** Main Tasks *******************************//

// Serve the project and watch
gulp.task('serve', function () {
	browserSync(config.browserSync);

	gulp.watch([
				paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
				'!' + paths.sprite.src + '**/*'
			],

			['images', browserSync.reload]
		 );

	gulp.watch(
			paths.sprite.src + '**/*.{png,gif}',

			['bitmap-sprite', browserSync.reload]
		);

	gulp.watch(
			paths.sprite.src + '**/*.svg',

			['vetor-sprite', 'styles', browserSync.reload]
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

			['styles', browserSync.reload]
		);

	gulp.watch([
			paths.styles.src + 'helpers/mixins/*.{styl,scss,sass,less}',
			paths.styles.src + 'helpers/functions/*.{styl,scss,sass,less}'],

			['styles-helpers']
		);

	gulp.watch(basePaths.dest + '**/*.{html,php}', browserSync.reload);
});

// Compile, watch and serve project
gulp.task('default', ['clean'], function () {
	sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'dependence-scripts'], 'svg2png', 'styles', 'scripts', function(){
			if(args.serve === true){
				gulp.start('serve');
			}
		});
});

// Build Project and serve if pass the parameter --serve
gulp.task('build', ['clean'], function () {
	sequence(['images', 'bitmap-sprite', 'vetor-sprite', 'styles-helpers', 'dependence-scripts'], 'svg2png', 'styles', 'scripts', 'copy', function(){
			if(args.serve === true){
				browserSync(config.browserSyncBuild);
			}
		});
});