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
		  csso = require('gulp-csso'),
		 clean = require('gulp-clean'),
		concat = require('gulp-concat'),
	minifyHTML = require('gulp-minify-html'),
		notify = require('gulp-notify'),
		  path = require('path'),
		  sass = require('gulp-ruby-sass'),
		 watch = require('gulp-watch'),
   runSequence = require('run-sequence'),
	livereload = require('gulp-livereload'),
			lr = require('tiny-lr'),
		server = lr();

//***************************** Path configs *****************************//

var			public_path = 'public/', // public files
   global_public_images = public_path + 'img', //root public images directory

   	 current_path_images = '/', //current image path
		  public_images = public_path + 'img' + current_path_images, // optimized images

		  styles_folder = 'css',
		  public_styles = public_path + styles_folder, // minified styles

		 scripts_folder = 'js', //
		 public_scripts = public_path + scripts_folder, // concat and minified scripts

			 fonts_path = public_path + 'fonts/', // concat and minified scripts

			  sass_path = 'src/stylesheets/', // sass files
				js_path = 'src/scripts/', // js files
	  global_image_path = 'src/images/', //root original images directory
			  img_path  = global_image_path + current_path_images, // original image files
			sprite_path = global_image_path + 'sprite-icons.png', // sprite filename

			  dist_path = 'dist/', // compiled folder project
		dist_fonts_path = dist_path + 'fonts'; // concat and minified scripts

//******************************** Tasks *********************************//

// Optimize Images
gulp.task('images', function() {
	return gulp.src([
			img_path + '*.{png,jpg,gif,svg}',
			'!' + img_path + '/icons/*', '!' + sprite_path
		])
		.pipe(imagemin({optimizationLevel: 5, progressive: true, cache: true}))
		.pipe(gulp.dest(public_images))
		.pipe(livereload(server))
		.pipe(notify({message: 'Images task complete'}));
});

// Optimize Sprite
gulp.task('sprite', function() {
	return gulp.src(sprite_path)
		.pipe(imagemin({optimizationLevel: 3, progressive: true, cache: true}))
		.pipe(gulp.dest(global_public_images))
		.pipe(livereload(server))
		.pipe(notify({message: 'Sprite task complete'}));
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
			js_path + 'plugins/outdatedbrowser-1.1.0.js',
			js_path + 'libs/**',
			js_path + 'frameworks/**',
			js_path + 'plugins/**',
			js_path + 'onread/open_onread.js',
			js_path + 'settings/*',
			js_path + 'main/*',
			js_path + 'onread/close_onread.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(public_scripts))
		.pipe(rename('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(public_scripts));
});

// Concatenate and Minify Angular Scripts
gulp.task('min-angular-scripts',  function() {
	return gulp.src([
			js_path + 'angular_scripts/**',
		])
		.pipe(concat('angular.min.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest(public_scripts));
});

// Concatenate Minified Scripts
gulp.task('concat-all-min-scripts',  function() {
	return gulp.src([
			public_scripts + '/scripts.min.js',
			public_scripts + '/angular.min.js'
		])
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(public_scripts));
});

// Clean Unutilized Scripts
gulp.task('clean-scripts', function() {
	return gulp.src([
			public_scripts + '/scripts.min.js',
			public_scripts + '/angular.min.js'
		], {read: false})
		.pipe(clean())
		.pipe(livereload(server))
		.pipe(notify({message: 'Scripts task complete'}));
});

// Compile Sass
gulp.task('sass', function() {
	return gulp.src(sass_path + '*.{sass,scss}')
		.pipe(sass({
			style: 'expanded' //The output style for the compiled css. Nested, expanded, compact, or compressed.
		}))
		.pipe(gulp.dest(public_styles))
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
	return gulp.src(fonts_path + '**')
		.pipe(gulp.dest(dist_fonts_path));
});

// Minify and Copy HTML and PHP
gulp.task('minify-html', function() {
	return gulp.src(public_path + '**/*.{html,php}')
		.pipe(minifyHTML({
			comments:false,
			spare:true
		}))
		.pipe(gulp.dest(dist_path))
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
	return gulp.src([dist_path,
					 public_styles,
					 public_scripts,
					 public_images + '*'], {read: false})
		.pipe(clean())
		.pipe(notify({message: 'Clean task complete'}));
});

// Reload Browser
gulp.task('reload-browser', function() {
	gulp.src(public_path + '**/*.{html,php}')
		.pipe(livereload(server))
		.pipe(notify({message: 'Reload complete'}));
});

// Watch
gulp.task('watch', function() {
	//Listen on port 35729
	server.listen(35729, function (err) {
		if (err) return console.log(err);

		// Watch .js files
		gulp.watch(js_path + '**/*.js', function(event) {
			gulp.run('scripts');
		});

		// Watch sass files
		gulp.watch(sass_path + '**/*.{sass,scss}', function(event) {
			gulp.run('sass');
		});

		// Watch .jpg .png .gif files
		gulp.watch([img_path + '**/*.{png,jpg,gif}', '!' + sprite_path], function(event) {
				gulp.run('images');
		});

		// Watch sprite file
		gulp.watch(sprite_path, function(event) {
		  gulp.run('sprite');
		});

		//Watch .html .php Files
		gulp.watch(public_path + '**/*.{html,php}', function(){
			gulp.run('reload-browser');
		});
	});
});

//================= Main Tasks =================//

// Default task
gulp.task('default', ['clean', 'sass', 'scripts', 'images', 'sprite'], function() {
	gulp.run('watch');
});


// Build Project
gulp.task('build', ['clean'], function(callback) {
	runSequence('minify-html', 'sass', 'css', 'concat-scripts', 'min-angular-scripts', 'concat-all-min-scripts', 'clean-scripts', 'copy-script', 'images', 'sprite', 'fonts', 'copy', callback);
});
