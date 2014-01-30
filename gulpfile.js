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
var	css_path  = 'project/css/*.css', // .css files
	js_path   = 'src/scripts/**/*.js', // .js files
	sass_path = 'src/stylesheets/**/*.scss', // .sass files
	img_path  = 'src/images/**/*.{png,jpg,gif}'; // image files


//**********************************Tasks**********************************//

// Optimize images
gulp.task('images', function() {
	gulp.src(img_path)
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('project/img'))
		.pipe(livereload(server));
});

// Concat and Minify scripts
gulp.task('scripts', function() {
	gulp.src(js_path)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('project/js'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('project/js'))
		.pipe(livereload(server));
});

// Compile and Minify Sass
gulp.task('compass', function() {
	gulp.src(sass_path)
		.pipe(compass({
			//config_file: 'src/config.rb',
			project: path.join(__dirname, 'src/'),
			css: '../project/css',
			sass: 'stylesheets'
			// imagesDir : 'project/images',
			// fontsDir : 'project/fonts',
			// generatedImagesDir : 'project/img',
			// httpPath : '/project',
			// httpStylesheetsPath : '/styles',
			// httpGeneratedImagesPath : 'project/images',
			// httpFontsPath : '/fonts'
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('temp'))
		.pipe(livereload(server));
});

// Clean directories
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
gulp.task('default', ['clean' , 'images', 'scripts'], function() {
	gulp.run('watch' );
});
