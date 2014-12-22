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
		  clean = require('gulp-clean'),
		 concat = require('gulp-concat'),
		   csso = require('gulp-csso'),
	   imagemin = require('gulp-imagemin'),
		 jshint = require('gulp-jshint'),
		  merge = require('merge-stream'),
	 minifyHTML = require('gulp-minify-html'),
		 notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		 rename = require('gulp-rename'),
		replace = require('gulp-replace'),
	   sequence = require('run-sequence'),
	spritesmith = require('gulp.spritesmith'),
		stylish = require('jshint-stylish'),
		 stylus = require('gulp-stylus'),
		 uglify = require('gulp-uglify'),
		  watch = require('gulp-watch'),

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
	}

	},

	filename = {
	sprite: 'sprite.png',
	scripts: {
		expanded: 'scripts.js',
		minified: 'scripts.min.js'
	},
	stylus: 'styles.styl'
	}

//******************************** Tasks *********************************//

// Generate Sprite
gulp.task('sprite', function () {
	var sprite = gulp.src(paths.sprite.src + '**/*.png')
					.pipe(
						spritesmith({
							imgName: filename.sprite,
							cssName: '_sprite.styl',
							imgPath: '../' + assetsFolder.images.dest + filename.sprite,
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

// Concatenate Stylus Mixins and Functions
gulp.task('stylus-helpers', function() {
	var mixins = gulp.src(paths.styles.src + 'helpers/mixins/*.styl')
					.pipe(concat('_mixins.styl'))
					.pipe(gulp.dest(paths.styles.src + 'helpers'));

	var functions = gulp.src(paths.styles.src + 'helpers/functions/*.styl')
						.pipe(concat('_functions.styl'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	return merge(mixins, functions);
});

// Compile Stylus Styles
gulp.task('styles', function() {
	return	gulp.src([
					paths.styles.src + '*.styl',
					'!' + paths.styles.src + '_*.styl',
				])
				.pipe(plumber())
				.pipe(stylus())
				.pipe(autoprefixer({
					browsers: ['safari >= 4', 'opera >= 3', "ie > 7", "ff > 10", 'chrome >= 10']
				}))
				.pipe(gulp.dest(paths.styles.dest));
});

// Execute concat-scripts, concat-all-min-scripts and clean-scripts tasks
gulp.task('scripts', function(callback) {
	return	sequence(
				'main-scripts',
				'unify-scripts',
				'clean-scripts',
				callback
			);
});

// Concatenate libs, frameworks, plugins Scripts and Minify
gulp.task('dependence-scripts', function() {
	return	gulp.src([
					paths.scripts.src + 'dependencies/plugins/outdatedbrowser-1.1.0.js',
					paths.scripts.src + 'dependencies/libs/*',
					paths.scripts.src + 'dependencies/frameworks/*',
					paths.scripts.src + 'dependencies/plugins/**'
				])
				.pipe(concat('dependencies.js'))
				.pipe(gulp.dest(paths.scripts.src))
				.pipe(rename('dependencies.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest(paths.scripts.src));
});

// Concatenate and Minify Main Scripts
gulp.task('main-scripts', function() {
	return gulp.src([
					'!' + paths.scripts.src + 'dependencies.js',
					'!' + paths.scripts.src + 'dependencies.min.js',
					paths.scripts.src + 'settings/outdatedbrowser.js',
					paths.scripts.src + 'jquery/onread/open_onread.js',
					paths.scripts.src + 'jquery/*',
					paths.scripts.src + 'jquery/onread/close_onread.js',
					paths.scripts.src + '*.js',
					paths.scripts.src + 'angular/**',
					paths.scripts.src + 'settings/google_analytics.js'
				])
				.pipe(plumber())
				.pipe(concat('main.js'))
				.pipe(jshint())
				.pipe(jshint.reporter('jshint-stylish'))
				.pipe(gulp.dest(paths.scripts.dest))
				.pipe(rename('main.min.js'))
				.pipe(uglify())
				// .pipe(uglify({mangle: false}))
				.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate and minify compiled Scripts
gulp.task('unify-scripts',  function() {
	var unminify = gulp.src([
							paths.scripts.src + 'dependencies.js',
							paths.scripts.dest + 'main.js'
						])
						.pipe(concat(filename.scripts.expanded))
						.pipe(gulp.dest(paths.scripts.dest));

	var minify = gulp.src([
						paths.scripts.src + 'dependencies.min.js',
						paths.scripts.dest + 'main.min.js'
					])
					.pipe(concat(filename.scripts.minified))
					.pipe(gulp.dest(paths.scripts.dest));

	return merge(unminify, minify);
});

//Clean unused Scripts
gulp.task('clean-scripts', function(){
	return	gulp.src([
					paths.scripts.dest + 'main.js',
					paths.scripts.dest + 'main.min.js'
				], {read: false})
				.pipe(clean())
				.pipe(notify({message: 'Scripts task complete', onLast: true}));
});

// Copy Files to Build
gulp.task('copy', function () {
	// Minify and Copy css
	// var css  =	gulp.src(paths.styles.dest + '*.css')
	// 			.pipe(csso())
	// 			.pipe(gulp.dest(paths.styles.build));

	// Copy Web Fonts
	var fonts =	gulp.src(paths.fonts.src + '**/*')
					.pipe(gulp.dest(paths.fonts.build));

	// Minify and Copy HTML
	var html =	gulp.src(basePaths.dest + '**/*.{html,php}')
					.pipe(replace(filename.scripts.expanded, filename.scripts.minified))
					.pipe(minifyHTML({spare:true, empty: true}))
					.pipe(gulp.dest(basePaths.build));

	// Copy Scripts
   // var script =	gulp.src([
   // 						paths.scripts.dest + filename.scripts.expanded,
   // 						paths.scripts.dest + filename.scripts.minified
   // 					])
			// 		.pipe(gulp.dest(paths.scripts.build));

	// Copy All Other files except HTML and PHP Files
	// var AllFiles =	gulp.src([
	// 					basePaths.dest + '*',
	// 					'!' + basePaths.dest + '**/*.{html,php}'
	// 				], {dot: true})
	// 				.pipe(gulp.dest(basePaths.build));

	// Copy Images
   var images =	gulp.src(paths.images.dest + '**/*')
					.pipe(gulp.dest(paths.images.build));
});

//================= Utility Tasks =================//

// Clean Directories
gulp.task('clean', function() {
	return	gulp.src([
					basePaths.build,
					paths.styles.dest,
					paths.styles.src + 'helpers/_mixins.styl',
					paths.styles.src + 'helpers/_functions.styl',
					paths.scripts.dest,
					paths.scripts.src + 'dependencies.js',
					paths.scripts.src + 'dependencies.min.js',
					paths.images.dest
				], {read: false})
				.pipe(clean())
				.pipe(notify({message: 'Clean task complete', onLast: true}));
});

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
	gulp.watch([paths.scripts.src + '**/*.js', '!' + paths.scripts.src + 'dependencies/**/*.js'], ['scripts', browserSync.reload]);

	// Watch dependencies .js files
	gulp.watch(paths.scripts.src + 'dependencies/**/*.js', ['dependence-scripts', 'scripts', browserSync.reload]);

	// Watch .styl files
	gulp.watch([paths.styles.src + '**/*.styl', '!' + paths.styles.src + 'helpers/mixins/*.styl', '!' + paths.styles.src + 'helpers/functions/*.styl'], ['styles', browserSync.reload]);

	// Watch Stylus Helpers files
	gulp.watch(paths.styles.src + 'helpers/mixins/*.styl', paths.styles.src + 'helpers/functions/*.styl', ['stylus-helpers']);

	//Watch .html .php Files
	gulp.watch(basePaths.dest + '**/*.{html,php}', browserSync.reload);
});

//================= Main Tasks =================//
// Default task
gulp.task('default', ['clean'], function(callback) {
	sequence(['images', 'sprite'], 'stylus-helpers', 'styles', 'dependence-scripts', 'scripts', 'watch',  callback);
});


// Build Project
// gulp.task('build', ['clean'], function(callback) {
// 	runSequence(['images', 'sprite'], 'dependence-scripts', 'scripts', 'stylus-helpers', 'styles', 'copy', callback);
// });
