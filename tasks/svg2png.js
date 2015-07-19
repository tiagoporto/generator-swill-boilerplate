//Convert SVG to PNG
gulp.task('svg2png', function () {
	return gulp.src(paths.images.dest + 'svg-sprite.svg')
				.pipe(svg2png())
				.pipe(gulp.dest(paths.images.dest));
});