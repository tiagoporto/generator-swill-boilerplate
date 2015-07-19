// Concatenate and Minify Main Scripts
gulp.task('scripts', function () {
	var concatenateJquery = gulp.src([
							'!' + paths.scripts.src + '**/_*.js',
							paths.scripts.src + 'jquery/*'
						])
						.pipe(cache('jquery'))
						.pipe(remember('jquery'))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(concat('jquery.js'))
						.pipe(insert.wrap('jQuery(document).ready(function($) {\n', '\n});'))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify(
						))
						.pipe(gulp.dest(paths.scripts.dest));

	var concatenate = gulp.src([
							'!' + paths.scripts.src + '**/_*.js',
							paths.scripts.src + 'settings/outdatedbrowser.js',
							paths.scripts.src + 'settings/*.js',
							paths.scripts.src + '*.js',
							paths.scripts.src + 'jquery/onread/open_onread.js',
							paths.scripts.src + 'jquery/*',
							paths.scripts.src + 'jquery/onread/close_onread.js',
							paths.scripts.src + 'angular/**',
							paths.scripts.src + 'settings/google_analytics.js'
						])
						.pipe(cache('scripts'))
						.pipe(remember('scripts'))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(concat('main.js'))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify(
						))
						.pipe(gulp.dest(paths.scripts.dest));

		   var copy = gulp.src([
							paths.scripts.src + 'angular/_*.js',
							paths.scripts.src + 'jquery/_*.js',
							paths.scripts.src + '/_*.js'
						])
						.pipe(newer(paths.scripts.dest))
						.pipe(plumber())
						.pipe(jshint())
						.pipe(jshint.reporter('jshint-stylish'))
						.pipe(rename(function(path){
							path.basename = path.basename.substring(1)
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(rename({suffix: '.min'}))
						.pipe(uglify({
							preserveComments: 'some'
							// Required to minify angularjs scripts
							//, mangle: false
						}))
						.pipe(gulp.dest(paths.scripts.dest))
						.pipe(notify({message: 'Scripts task complete', onLast: true}));

	return merge(concatenate, concatenateJquery, copy);
});