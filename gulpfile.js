/*
	My Gulp.js Template
	Version: 3.0.0beta
	Author: Tiago Porto - http://www.tiagoporto.com
	https://github.com/tiagoporto/my-gulp-template
	Contact: me@tiagoporto.com
*/

'use strict';

//************************* Load dependencies ****************************//
var		   gulp = require('gulp'),
   autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
		  cache = require('gulp-cached'),
	// 	  clean = require('gulp-clean'),
	// 	 concat = require('gulp-concat'),
		   csso = require('gulp-csso'),
	   imagemin = require('gulp-imagemin'),
	// 	 jshint = require('gulp-jshint'),
		  merge = require('merge-stream'),
	//  minifyHTML = require('gulp-minify-html'),
		 notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		 rename = require('gulp-rename'),
	   sequence = require('run-sequence'),
	 sourcemaps = require('gulp-sourcemaps'),
	spritesmith = require('gulp.spritesmith'),
	// 	stylish = require('jshint-stylish'),
		 stylus = require('gulp-stylus'),
	// 	 uglify = require('gulp-uglify'),
	// 	  watch = require('gulp-watch'),

//***************************** Path configs *****************************//
	basePaths = {
		 src: 'src/',
		dest: 'public/',
		build: 'build/'
	},

	assetsFolder = {
		images: {
			 src: 'images/',
			dest: 'images/'
		},

		sprite: {src: 'sprite/'},

		scripts: {
			 src: 'scripts/',
			dest: 'js/'
		},

		styles: {
			 src: 'stylesheets/',
			dest: 'css/'
		},

		fonts: {dest: 'fonts/'}
	},

	paths = {
		images: {
			  src: basePaths.src + assetsFolder.images.src ,
			 dest: basePaths.dest + assetsFolder.images.dest,
			build: basePaths.build + assetsFolder.images.src
		},

		sprite: {
			  src: basePaths.src + assetsFolder.images.src + assetsFolder.sprite.src,
			 dest: basePaths.dest + assetsFolder.images.src + assetsFolder.sprite.src
		},

		scripts: {
			  src: basePaths.src + assetsFolder.scripts.src,
			 dest: basePaths.dest + assetsFolder.scripts.dest,
			build: basePaths.build + assetsFolder.scripts.dest
		},

		styles: {
			  src: basePaths.src + assetsFolder.styles.src,
			 dest: basePaths.dest + assetsFolder.styles.dest,
			build: basePaths.build + assetsFolder.styles.dest
		},

		fonts: {
			build: basePaths.build + assetsFolder.fonts.dest,
			  src: basePaths.dest + assetsFolder.fonts.dest
		},
	}

//******************************** Tasks *********************************//

// Generate Sprite
gulp.task('sprite', function () {
	var sprite = gulp.src(paths.sprite.src + '**/*.png')
					.pipe(
						spritesmith({
							imgName: 'sprite.png',
							cssName: '_sprite.styl',
							imgPath: '../' + assetsFolder.images.dest + 'sprite.png',
							padding: 2,
							algorithmOpts: { sort: false}
						})
					);

	sprite.img
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest));
	sprite.css
		.pipe(gulp.dest(paths.styles.src))
		.pipe(notify({message: 'Sprite task complete'}));

	return sprite;
});

// Optimize Images
gulp.task('images', function() {
	return	gulp.src([
				paths.images.src + '**/*.{png,jpg,gif,svg}',
				'!' + paths.sprite.src + '**/*'
			])
			.pipe(cache('imagemin'))
			.pipe(imagemin({optimizationLevel: 5, progressive: true}))
			.pipe(gulp.dest(paths.images.dest))
			.pipe(notify({message: 'Images task complete', onLast: true}));
});

// Concatenate Stylus Mixins
// gulp.task('stylus-mixins', function() {
// 	return	gulp.src(paths.styles.src + 'helpers/mixins/*.styl')
// 				.pipe(concat('mixins.styl'))
// 				.pipe(gulp.dest(paths.styles.src + 'helpers'))
// 				.pipe(notify({message: 'Stylus-mixins task complete', onLast: true}));
// });

// Compile Stylus Styles
gulp.task('styles', function() {
	return	gulp.src(paths.styles.src + 'styles.styl')
						.pipe(plumber())
						.pipe(
							sourcemaps.init({debug:true})
						)
						.pipe(stylus())
						.pipe(autoprefixer({
							browsers: ['safari >= 4', 'opera >= 3', "ie > 7", "ff > 10", 'chrome >= 10']
						}))
						.pipe(sourcemaps.write('./', {
							includeContent: false,
							sourceRoot: "../" + assetsFolder.styles.src
						}))
						.pipe(gulp.dest(paths.styles.dest));


	// 	var styles	=	gulp.src(paths.styles.src + 'styles.styl')
	// 					.pipe(plumber())
	// 					.pipe(
	// 						sourcemaps.init({
	// 							loadMaps: true
	// 						})
	// 					)
	// 					.pipe(stylus({
	// 						sourcemap: {
	// 							inline: true,
	// 							sourceRoot: '../',
	// 							basePath: paths.styles.src
	// 						}
	// 					}))
	// 					.pipe(autoprefixer({
	// 						browsers: ['safari >= 4', 'opera >= 3', "ie > 7", "ff > 10", 'chrome >= 10']
	// 					}))
	// 					.pipe(sourcemaps.write('.', {
	// 						includeContent: false,
	// 						sourceRoot: "../"
	// 					}))
	// 					.pipe(gulp.dest(paths.styles.dest));

	// var stylesmin =	gulp.src(paths.styles.src + 'styles.styl')
	// 					.pipe(plumber())
	// 					.pipe(
	// 						sourcemaps.init({
	// 							loadMaps: true
	// 						})
	// 					)
	// 					.pipe(stylus({
	// 						compress: true,
	// 						sourcemap: {
	// 							inline: true,
	// 							sourceRoot: '../',
	// 							basePath: paths.styles.src
	// 						}
	// 					}))
	// 					.pipe(autoprefixer({
	// 						browsers: ['safari >= 4', 'opera >= 3', "ie > 7", "ff > 10", 'chrome >= 10']
	// 					}))
	// 					.pipe(sourcemaps.write('.', {
	// 						includeContent: false,
	// 						sourceRoot: "../"
	// 					}))
	// 					.pipe(rename({suffix: '.min'}))
	// 					.pipe(gulp.dest(paths.styles.dest))
	// 					.pipe(notify({message: 'Styles task complete.'}));

	// return merge(styles, stylesmin);
});

// Execute concat-scripts, min-angular-scripts, concat-all-min-scripts and clean-scripts tasks
// gulp.task('scripts', function(callback) {
// 	return	runSequence(
// 				'main-scripts',
// 				'unify-scripts',
// 				'clean-scripts',
// 				callback
// 			);
// });

// Concatenate libs, frameworks, plugins Scripts and Minify
// gulp.task('dependence-scripts', function() {
// 	return	gulp.src([
// 				paths.scripts.src + 'dependencies/plugins/outdatedbrowser-1.1.0.js',
// 				paths.scripts.src + 'dependencies/libs/*',
// 				paths.scripts.src + 'dependencies/frameworks/*',
// 				paths.scripts.src + 'dependencies/plugins/**'
// 			])
// 			.pipe(concat('dependencies.js'))
// 			.pipe(gulp.dest(paths.scripts.dest))
// 			.pipe(rename('dependencies.min.js'))
// 			.pipe(uglify())
// 			.pipe(gulp.dest(paths.scripts.dest));
// });

// Concatenate and Minify Main Scripts
// gulp.task('main-scripts', function() {
// 	var scripts  =	gulp.src([
// 						paths.scripts.src + 'settings/outdatedbrowser.js',
// 						paths.scripts.src + 'jquery/onread/open_onread.js',
// 						paths.scripts.src + 'jquery/*',
// 						paths.scripts.src + 'jquery/onread/close_onread.js',
// 						paths.scripts.src + '*',
// 						paths.scripts.src + 'settings/google_analytics.js'
// 					])
// 					.pipe(concat('main-scripts.js'))
// 					.pipe(jshint())
// 					.pipe(jshint.reporter('jshint-stylish'))
// 					.pipe(gulp.dest(paths.scripts.dest))
// 					.pipe(rename('main-scripts.min.js'))
// 					.pipe(uglify())
// 					.pipe(gulp.dest(paths.scripts.dest));

// 	var angular  =	gulp.src([
// 						paths.scripts.src + 'angular/**',
// 					])
// 					.pipe(concat('angular.js'))
// 					.pipe(gulp.dest(paths.scripts.dest))
// 					.pipe(rename('angular.min.js'))
// 					.pipe(uglify({mangle: false}))
// 					.pipe(gulp.dest(paths.scripts.dest));

// 	return merge(scripts, angular);
// });

// Concatenate and minify compiled Scripts
// gulp.task('unify-scripts',  function() {
// 	var unminify = gulp.src([
// 			paths.scripts.dest + 'dependencies.js',
// 			paths.scripts.dest + 'angular.js',
// 			paths.scripts.dest + 'main-scripts.js'
// 		])
// 		.pipe(concat('scripts.js'))
// 		.pipe(gulp.dest(paths.scripts.dest));

// 	var minify = gulp.src([
// 			paths.scripts.dest + 'dependencies.min.js',
// 			paths.scripts.dest + 'angular.min.js',
// 			paths.scripts.dest + 'main-scripts.min.js'
// 		])
// 		.pipe(concat('scripts.min.js'))
// 		.pipe(gulp.dest(paths.scripts.dest));

// 	return merge(unminify, minify);
// });

//Clean unused Scripts
// gulp.task('clean-scripts', function(){
// 	return	gulp.src([
// 				paths.scripts.dest + 'main-scripts.min.js',
// 				paths.scripts.dest + 'angular.js',
// 				paths.scripts.dest + 'angular.min.js'
// 			], {read: false})
// 			.pipe(clean())
// 			.pipe(notify({message: 'Scripts task complete', onLast: true}));
// });

// Copy Files to Build
gulp.task('copy', function () {

	// Minify and Copy css
		 // var css  =	gulp.src(paths.styles.dest + '*.css')
						// .pipe(csso())
						// .pipe(gulp.dest(paths.styles.build));

	// Copy Web Fonts
		// var fonts =	gulp.src(paths.fonts.src + '**/*')
						// .pipe(gulp.dest(paths.fonts.build));

	// Minify and Copy HTML
		 // var html =	gulp.src(basePaths.dest + '**/*.{html,php}')
						// .pipe(minifyHTML({spare:true, empty: true}))
						// .pipe(gulp.dest(basePaths.build));

	// Copy Scripts
	   // var script =	gulp.src([
	   		// 				paths.scripts.dest + 'scripts.js',
	   		// 				paths.scripts.dest + 'scripts.min.js'
	   		// 			])
						// .pipe(gulp.dest(paths.scripts.build));

	// Copy All Other files except HTML and PHP Files
	 // var AllFiles =	gulp.src([
		// 					basePaths.dest + '*',
		// 					'!' + basePaths.dest + '**/*.{html,php}'
		// 				], {dot: true})
		// 				.pipe(gulp.dest(basePaths.build));

	// Copy Images
	   // var images =	gulp.src(paths.images.dest + '**/*')
						// .pipe(gulp.dest(paths.images.build));
});

//================= Utility Tasks =================//

// Clean Directories
// gulp.task('clean', function() {
// 	return	gulp.src([
// 					basePaths.build,
// 					paths.styles.dest,
// 					paths.scripts.dest,
// 					paths.images.dest
// 				], {read: false})
// 				.pipe(clean())
// 				.pipe(notify({message: 'Clean task complete', onLast: true}));
// });

// Watch
gulp.task('watch', function() {
	browserSync({
		notify: false,
		// proxy: "localhost/my-gulp-template/public/"
		server: {
			baseDir: [basePaths.src, basePaths.dest]
		}
	});

	// Watch .jpg .png .gif files
	gulp.watch([paths.images.src + '**/*.{png,jpg,gif,svg}', '!' + paths.sprite.src + '**/*'], ['images', browserSync.reload]);

	// Watch sprite file
	gulp.watch(paths.sprite.src + '**/*.{png,jpg,gif}', ['sprite', browserSync.reload]);

	// Watch .js files
	// gulp.watch([paths.scripts.src + '**/*.js', '!' + paths.scripts.src + 'dependencies/**/*.js'], ['scripts', browserSync.reload]);

	// Watch dependencies .js files
	// gulp.watch(paths.scripts.src + 'dependencies/**/*.js', ['dependence-scripts', 'scripts', browserSync.reload]);

	// Watch .styl files
	gulp.watch([paths.styles.src + '**/*.styl', '!' + paths.styles.src + 'helpers/mixins/*.styl'], ['styles', browserSync.reload]);

	// Watch Stylus mixins files
	// gulp.watch(paths.styles.src + 'helpers/mixins/*.styl', ['stylus-mixins']);

	//Watch .html .php Files
	// gulp.watch(basePaths.dest + '**/*.{html,php}', browserSync.reload);
});

//================= Main Tasks =================//
// Default task
gulp.task('default', function(callback) {
	sequence('styles', 'watch',  callback);
	// sequence(['images', 'sprite'], 'styles', 'watch',  callback);
});
// gulp.task('default', ['clean'], function(callback) {
// 	runSequence(['images', 'sprite'], 'dependence-scripts', 'scripts', 'stylus-mixins', 'styles', 'watch',  callback);
// });


// Build Project
// gulp.task('build', ['clean'], function(callback) {
// 	runSequence(['images', 'sprite'], 'dependence-scripts', 'scripts', 'stylus-mixins', 'styles', 'copy', callback);
// });
