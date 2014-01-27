// Load plugins
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
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

//Tasks

// JSHint + Concat + Minifier scripts
gulp.task('scripts', function() {
	return gulp.src(['src/scripts/**/*.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(livereload(server))
});


//Compass
gulp.task('compass', function() {
	gulp.src('src/stylesheets/**/*.scss')
		.pipe(compass({
			config_file: 'src/config.rb',
			project: path.join(__dirname, '/'),
			css: 'css',
			sass: 'stylesheets'
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('../css'));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    //.pipe(livereload(server))
    .pipe(gulp.dest('img'))
});

//Clean
gulp.task('clean', function() {
  return gulp.src(['css', 'js', 'img'], {read: false})
    .pipe(clean());
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('scripts', 'compass', 'images' );
});

//Watch
gulp.task('watch', function() {
	//Listen on port 35729
	// server.listen(35729, function (err) {
	// 	if (err) {
	// 		return console.log(err)
	// 	};

		// Watch .js files
		gulp.watch('src/scripts/**/*.js', function(event) {
			gutil.log('File '+event.path+' was '+event.type+', running tasks...');
			gulp.run('scripts');
		});

		// Watch .scss files
		    gulp.watch('src/stylesheets/**/*.scss', function(event) {
		      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		      gulp.run('compass');
		    });

		// Watch image files
		gulp.watch('src/images/**/*', function(event) {
		  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		  gulp.run('images');
		});

	//});
});