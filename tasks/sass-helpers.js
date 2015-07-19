// Concatenate Sass Mixins and Functions
gulp.task('sass-helpers', function () {
	   var mixins = gulp.src(paths.styles.src + 'helpers/mixins/*.scss')
						.pipe(concat('_mixins.scss'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	var functions = gulp.src(paths.styles.src + 'helpers/functions/*.scss')
						.pipe(concat('_functions.scss'))
						.pipe(gulp.dest(paths.styles.src + 'helpers'));

	return merge(mixins, functions);
});