/*
	My Gulp.js Template
	Version: 1.5.2
	Author: Tiago Porto - http://www.tiagoporto.com
	https://github.com/tiagoporto
	Contact: me@tiagoporto.com
*/

//************************* Load dependencies ****************************//
var		  gulp = require('gulp'),
		uglify = require('gulp-uglify'),
	  imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),
		 cache = require('gulp-cached'),
	  remember = require('gulp-remember'),
		  csso = require('gulp-csso'),
		 clean = require('gulp-clean'),
		concat = require('gulp-concat'),
	minifyHTML = require('gulp-minify-html'),
		notify = require('gulp-notify'),
		  path = require('path'),
		  sass = require('gulp-ruby-sass'),
   spritesmith = require('gulp.spritesmith'),
		 watch = require('gulp-watch'),
   runSequence = require('run-sequence'),
	livereload = require('gulp-livereload'),
			lr = require('tiny-lr'),
		server = lr(),

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
			dest: basePaths.dest + assetsFolder.images.src
		},

		sprite: {
			src: basePaths.src + assetsFolder.images.src + assetsFolder.sprite.src
		},

		scripts: {
			 src: basePaths.src + assetsFolder.scripts.src,
			dest: basePaths.dest + assetsFolder.scripts.dest
		},

		styles: {
			 src: basePaths.src + assetsFolder.styles.src ,
			dest: basePaths.dest + assetsFolder.styles.dest
		},

		fonts: {
			dest: basePaths.dest + assetsFolder.fonts.dest
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
		.pipe(notify({message: 'Images task complete'}));
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
		.pipe(notify({message: 'Scripts task complete'}));
});

// Compile Sass
gulp.task('sass', function() {
	return gulp.src(paths.styles.src + '*.{sass,scss}')
		.pipe(sass({
			style: 'expanded' //The output style for the compiled css. Nested, expanded, compact, or compressed.
		}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(livereload(server))
		.pipe(notify({message: 'Sass task complete'}));
});

// Minify and copy css
gulp.task('css', function() {
	return gulp.src(public_styles + '/*.css')
			.pipe(csso())
			.pipe(gulp.dest(dist_path + styles_folder));
});


// Copy Web Fonts To Dist
gulp.task('fonts', function () {
	return gulp.src(paths.fonts.src + '**')
		.pipe(gulp.dest(basePaths.build));
});

// Minify and Copy HTML and PHP
gulp.task('minify-html', function() {
	return gulp.src(basePaths.src + '**/*.{html,php}')
		.pipe(minifyHTML({
			comments:false,
			spare:true
		}))
		.pipe(gulp.dest(basePaths.build))
});

// Copy script
gulp.task('copy-script', function () {
	return gulp.src(public_scripts + '/main.min.js')
			.pipe(rename('main.js'))
			.pipe(gulp.dest(dist_path + scripts_folder));
});

// Copy All Files At (public)
gulp.task('copy', function () {
	return gulp.src([
				public_path + '*',
				global_public_images + '**/*',
				'!' + public_path + '**/*.html'
			], {
				dot: true
			})
			.pipe(gulp.dest(dist_path));
});

// Clean Directories
gulp.task('clean', function() {
	return gulp.src([basePaths.build,
					 paths.styles.dest,
					 paths.scripts.dest,
					 paths.images.dest], {read: false})
		.pipe(clean())
		.pipe(notify({message: 'Clean task complete'}));
});

// Reload Browser
gulp.task('reload-browser', function() {
	gulp.src(basePaths.dest + '**/*.{html,php}')
		.pipe(livereload(server))
		.pipe(notify({message: 'Reload complete'}));
});

// Watch
gulp.task('watch', function() {
	//Listen on port 35729
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		// Watch .js files
		gulp.watch(paths.scripts.src + '**/*.js', function(event) {
			gulp.run('scripts');
		});

		// Watch sass files
		gulp.watch(paths.styles.src + '**/*.{sass,scss}', function(event) {
			gulp.run('sass');
		});

		// Watch .jpg .png .gif files
		gulp.watch([paths.images.src + '**/*.{png,jpg,gif,svg}', '!' + paths.sprite.src + '**/*'], function(event) {
				gulp.run('images');
		});

		// Watch sprite file
		gulp.watch(paths.sprite.src + '**/*.{png,jpg,gif}', function(event) {
		  gulp.run('sprite');
		});

		//Watch .html .php Files
		gulp.watch(basePaths.dest + '**/*.{html,php}', function(){
			gulp.run('reload-browser');
		});
	});
});

//================= Main Tasks =================//
// Default task
gulp.task('default', ['clean'], function(callback) {
	runSequence('images', 'sprite', 'sass', 'scripts', 'watch',  callback);
});


// Build Project
gulp.task('build', ['clean'], function(callback) {
	runSequence('images', 'sprite', 'sass', 'css', 'concat-scripts', 'min-angular-scripts', 'concat-all-min-scripts', 'clean-scripts', 'copy-script', 'minify-html', 'fonts', 'copy', callback);
});
