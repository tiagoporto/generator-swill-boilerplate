// Optimize Images
gulp.task('images', function () {
	var images =	gulp.src([
					paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
					'!' + paths.sprite.bitmap + '**/*',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(newer(paths.images.dest))
				.pipe(imagemin({optimizationLevel: 5, progressive: true}))
				.pipe(gulp.dest(paths.images.dest));

	var svg = gulp.src([
					paths.images.src + '**/*.svg',
					'!' + paths.sprite.svg + '**/*'
				])
				.pipe(svg2png())
				.pipe(gulp.dest(paths.images.dest))
				.pipe(notify({message: 'Images task complete', onLast: true}));

	return merge(images, svg)
});