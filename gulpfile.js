// Load plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	compass = require('gulp-compass'),
	path = require('path');
	minifyCSS = require('gulp-minify-css');
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');
	lr = require('tiny-lr'),
	server = lr();

// Path configs
var	css_path  = 'build/css/*.css', // .css files
	js_path   = 'src/scripts/**/*.js', // .js files
	sass_path = 'src/stylesheets/**/*.scss'; // .sass files
	img_path  = 'src/images/**/*' // image files


//***************************************Tasks***************************************//

// Concat + Minifier scripts
gulp.task('scripts', function() {
	gulp.src(js_path)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(livereload(server));
});


//Compass
gulp.task('compass', function() {
	gulp.src(sass_path)
		.pipe(compass({
			config_file: 'src/config.rb',
			//project: path.join(__dirname, 'src/stylesheets'),
			// css: 'build/css',
			// sass: 'src/stylesheets'
			// imagesDir : 'build/images',
			// fontsDir : 'build/fonts',
			// generatedImagesDir : 'build/img',
			// httpPath : '/build',
			// httpStylesheetsPath : '/styles',
			// httpGeneratedImagesPath : 'build/images',
			// httpFontsPath : '/fonts'
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('build/css'))
		.pipe(livereload(server));
});

// Images
gulp.task('images', function() {
  gulp.src(img_path)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'))
    .pipe(livereload(server));
});

//Clean
gulp.task('clean', function() {
  return gulp.src(['build/css', 'build/js', 'build/img'], {read: false})
    .pipe(clean());
});

// Reload browser
gulp.task('reload-browser', function() {
	gulp.src('build/**/*.html')
		.pipe(livereload(server));
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('scripts', 'images', 'compass' );
});

//Watch
gulp.task('watch', function() {
	//Listen on port 35729
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		// Watch .js files
		gulp.watch(js_path, function(event) {
			gutil.log('File '+event.path+' was '+event.type+', running tasks...');
			gulp.run('scripts');
		});

		// Watch .scss files
		gulp.watch(sass_path, function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('compass');
		});

		// Watch image files
		gulp.watch(img_path, function(event) {
		  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		  gulp.run('images');
		});

		//Watch html Files
		gulp.watch('build/**/*.html', function(){
			gulp.run('reload-browser');
		});

	});
});