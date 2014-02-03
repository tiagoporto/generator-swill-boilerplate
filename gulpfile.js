// Load plugins
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	compass = require('gulp-compass'),
	path = require('path'),
	minifyCSS = require('gulp-minify-css'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

// Path configs
var	css_path  = 'src/stylesheets/css/**/*.css', // .css files
	sass_path = 'src/stylesheets/sass/**/*.scss', // .sass files
	js_path   = 'src/scripts/**/*.js', // .js files
	img_path  = 'src/images/**/*.{png,jpg,gif}'; // image files


//**********************************Tasks**********************************//

// Optimize Images
gulp.task('images', function() {
	gulp.src([img_path, '!src/images/icons/*' ])
		//.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('project/img'))
		.pipe(livereload(server));
});

// Concat and Minify Scripts
gulp.task('scripts', function() {
	gulp.src(['src/scripts/vendor/**', 'src/scripts/plugins/**', js_path])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('project/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('project/js'))
		.pipe(livereload(server));
});

// Compile Compass and Minify CSS
gulp.task('compass', function() {
	gulp.src(sass_path)
		.pipe(compass({
			// config_file: '../config.rb',
			project: path.join(__dirname, '/'),
			css: 'src/stylesheets/css',
			sass: 'src/stylesheets/sass',
			image: 'src/images',
			comments: false,
			relative: false,

		}))
		.pipe(gulp.dest('src/stylesheets/css'))
});

// Concat and Minify Styles
gulp.task('styles', function() {
	gulp.src(css_path)
	.pipe(concat('main.css'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('project/css'))
	.pipe(livereload(server));
});

// Clean Directories
gulp.task('clean', function() {
	return gulp.src(['project/css', 'project/js', 'project/img'], {read: false})
		.pipe(clean());
});

// Reload Browser
gulp.task('reload-browser', function() {
	gulp.src('project/**/*.html')
		.pipe(livereload(server));
});

//Watch
gulp.task('watch', function() {
	//Listen on port 35729
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		// Watch .js files
		gulp.watch(js_path, function(event) {
			gulp.run('scripts');
		});

		// Watch .scss files
		gulp.watch(sass_path, function(event) {
			gulp.run('compass');
		});

		// Watch .css files
		gulp.watch(css_path, function(event) {
			gulp.run('styles');
		});

		// Watch .jpg .png .gif files
		gulp.watch(img_path, function(event) {
		  gulp.run('images');
		});

		//Watch .html .php Files
		gulp.watch('project/**/*.{html,php}', function(){
			gulp.run('reload-browser');
		});

	});
});

// Default task
gulp.task('default', ['clean', 'compass', 'scripts', 'images'], function() {
	gulp.run('watch');
});
