// Generate Bitmap Sprite
module.exports = function (gulp, plugins, basePaths, paths) {
	return function () {
		var sprite = gulp.src(paths.sprite.bitmap + '**/*.png')
						.pipe(
							plugins.spritesmith({
								imgName: 'sprite.png',
								cssName: '_sprite.styl',
								imgPath: '../' + basePaths.images.dest + 'sprite.png',
								padding: 2,
								algorithm: 'top-down'
							})
						);

		sprite.img
			.pipe(plugins.imagemin())
			.pipe(gulp.dest(paths.images.dest));
		sprite.css
			.pipe(gulp.dest(paths.styles.src + 'helpers'))
			.pipe(plugins.notify({message: 'Bitmap sprite task complete', onLast: true}));

		return sprite;
	};
};