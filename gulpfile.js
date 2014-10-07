/*
	My Gulp.js Template
	Version: 1.5.2
	Author: Tiago Porto - http://www.tiagoporto.com
	https://github.com/tiagoporto
	Contact: me@tiagoporto.com
*/

//************************* Load dependencies ****************************//
var		   gulp = require('gulp'),
		  cache = require('gulp-cached'),
		  clean = require('gulp-clean'),
		 concat = require('gulp-concat'),
		   csso = require('gulp-csso'),
	   imagemin = require('gulp-imagemin'),
		 jshint = require('gulp-jshint'),
	 livereload = require('gulp-livereload'),
			 lr = require('tiny-lr'),
	 minifyHTML = require('gulp-minify-html'),
		 notify = require('gulp-notify'),
		   path = require('path'),
	   remember = require('gulp-remember'),
		 rename = require('gulp-rename'),
	runSequence = require('run-sequence'),
		   sass = require('gulp-ruby-sass'),
		 server = lr(),
	spritesmith = require('gulp.spritesmith'),
		stylish = require('jshint-stylish'),
		 uglify = require('gulp-uglify'),
		  watch = require('gulp-watch'),

//***************************** Path configs *****************************//
	basePaths = {
		 src: 'src/',
		dest: 'public/',
		build: 'dist/'
	},

	assetsFolder = {
		images: {
			 src: 'images/',
			dest: 'images/'
		},

		sprite: {
			src: 'sprite/'
		},

		scripts: {
			 src: 'scripts/',
			dest: 'js/'
		},

		styles: {
			 src: 'stylesheets/',
			dest: 'css/'
		},

		fonts: {
			dest: 'fonts/'
		}
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

// Optimize Images
gulp.task('images', function() {
	return gulp.src([
			paths.images.src + '**/*.{png,jpg,gif,svg}',
			'!' + paths.sprite.src + '**/*'
		])
		.pipe(cache(imagemin({optimizationLevel: 5, progressive: true})))
		.pipe(gulp.dest(paths.images.dest))
		.pipe(livereload(server))
		.pipe(notify({
			message: 'Images task complete',
			onLast: true
		}));
});

// Generate Sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.sprite.src + '**/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        padding: 2,
        algorithmOpts: {
			sort: false
		}
    }));
    spriteData.img
    	.pipe(imagemin())
    	.pipe(gulp.dest(paths.images.dest));
    spriteData.css
    	.pipe(gulp.dest(paths.styles.src));
});


// Execute concat-scripts, min-angular-scripts, concat-all-min-scripts and clean-scripts tasks
gulp.task('scripts', function(callback) {
	return runSequence('concat-scripts',
		'min-angular-scripts',
		'concat-all-min-scripts',
		'clean-scripts',
		callback
	);
});

// Concatenate and Minify Scripts
gulp.task('concat-scripts', function() {
	return gulp.src([
			paths.scripts.src + 'plugins/outdatedbrowser-1.1.0.js',
			paths.scripts.src + 'libs/**',
			paths.scripts.src + 'frameworks/**',
			paths.scripts.src + 'plugins/**',
			paths.scripts.src + 'onread/open_onread.js',
			paths.scripts.src + 'settings/*',
			paths.scripts.src + 'main/*',
			paths.scripts.src + 'onread/close_onread.js',
			paths.scripts.src + 'analytics/google_analytics.js'
		])
		.pipe(concat('main.js'))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(rename('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate and Minify Angular Scripts
gulp.task('min-angular-scripts',  function() {
	return gulp.src([
			paths.scripts.src + 'angular_scripts/**',
		])
		.pipe(concat('angular.min.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest(paths.scripts.dest));
});

// Concatenate Minified Scripts
gulp.task('concat-all-min-scripts',  function() {
	return gulp.src([
			paths.scripts.dest + 'scripts.min.js',
			paths.scripts.dest + 'angular.min.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(paths.scripts.dest));
});

// Clean Unutilized Scripts
gulp.task('clean-scripts', function() {
	return gulp.src([
			paths.scripts.dest + 'scripts.min.js',
			paths.scripts.dest + 'angular.min.js'
		], {read: false})
		.pipe(clean())
		.pipe(livereload(server))
		.pipe(notify({
			message: 'Scripts task complete',
			onLast: true
		}));
});

// Compile Sass
gulp.task('sass', function() {
	return gulp.src(paths.styles.src + '*.{sass,scss}')
		.pipe(sass({
			style: 'expanded' //The output style for the compiled css. Nested, expanded, compact, or compressed.
		}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(livereload(server))
		.pipe(notify({
			message: 'Sass task complete',
			onLast: true
		}));
});


// Copy All Files At (public)
gulp.task('copy', function () {
	// Minify and copy css
	var css =  gulp.src(paths.styles.dest + '*.css')
			.pipe(csso())
			.pipe(gulp.dest(paths.styles.build));

	// Copy Web Fonts To Dist
	var fonts = gulp.src(paths.fonts.src + '**/*')
		.pipe(gulp.dest(paths.fonts.build));

	// Minify and Copy HTML and PHP
	var html = gulp.src(basePaths.dest + '**/*.{html,php}')
		.pipe(minifyHTML({
			comments:false,
			spare:true
		}))
		.pipe(gulp.dest(basePaths.build));

	// Copy script And reaame
	var script = gulp.src(paths.scripts.dest + 'main.min.js')
			.pipe(rename('main.js'))
			.pipe(gulp.dest(paths.scripts.build));

	var AllFiles = gulp.src([
				basePaths.dest + '*',
				'!' + basePaths.dest + '**/*.html'
			], {
				dot: true
			})
			.pipe(gulp.dest(basePaths.build));

	var images = gulp.src(paths.images.dest + '**/*')
			.pipe(gulp.dest(paths.images.build));
});

//================= Utility Tasks =================//

// Clean Directories
gulp.task('clean', function() {
	return gulp.src([basePaths.build,
					 paths.styles.dest,
					 paths.scripts.dest,
					 paths.images.dest], {read: false})
		.pipe(clean())
		.pipe(notify({
			message: 'Clean task complete',
			onLast: true
		}));
});

// Reload Browser
gulp.task('reload-browser', function() {
	gulp.src(basePaths.dest + '**/*.{html,php}')
		.pipe(livereload(server))
		.pipe(notify({
			message: 'Reload complete',
			onLast: true
		}));
});

// Watch
gulp.task('watch', function() {
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		// Watch .js files
		gulp.watch(paths.scripts.src + '**/*.js', ['scripts']);

		// Watch sass files
		gulp.watch(paths.styles.src + '**/*.{sass,scss}', ['sass']);

		// Watch .jpg .png .gif files
		gulp.watch([paths.images.src + '**/*.{png,jpg,gif,svg}', '!' + paths.sprite.src + '**/*'], ['images']);

		// Watch sprite file
		gulp.watch(paths.sprite.src + '**/*.{png,jpg,gif}', ['sprite']);

		//Watch .html .php Files
		gulp.watch(basePaths.dest + '**/*.{html,php}', ['reload-browser']);
	});
});

//================= Main Tasks =================//
// Default task
gulp.task('default', ['clean'], function(callback) {
	runSequence(['images', 'sprite', 'scripts'], 'sass', 'watch',  callback);
});


// Build Project
gulp.task('build', ['clean'], function(callback) {
	runSequence(['images', 'sprite', 'scripts'], 'sass', 'copy', callback);
});
