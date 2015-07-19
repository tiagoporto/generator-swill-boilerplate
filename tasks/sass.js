// Compile and Prefix Sass Styles
gulp.task('sass', function () {
	return  sass(paths.styles.src + 'styles.scss', {precision: 3, style: 'expanded'})
				.pipe(autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.on('error', function (err) {
					console.error('Error', err.message);
				})
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(csso())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(notify({message: 'Styles task complete', onLast: true}));

});