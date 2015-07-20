// Optimize Images
module.exports = function (gulp, plugins, basePaths, paths) {
	return function () {
		var images =	gulp.src([
						paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
						'!' + paths.sprite.bitmap + '**/*',
						'!' + paths.sprite.svg + '**/*'
					])
					.pipe(plugins.newer(paths.images.dest))
					.pipe(plugins.imagemin({optimizationLevel: 5, progressive: true}))
					.pipe(gulp.dest(paths.images.dest));

		var svg = gulp.src([
						paths.images.src + '**/*.svg',
						'!' + paths.sprite.svg + '**/*'
					])
					.pipe(plugins.svg2png())
					.pipe(gulp.dest(paths.images.dest))
					.pipe(plugins.notify({message: 'Images task complete', onLast: true}));

		plugins.merge(images, svg)
	};
};

