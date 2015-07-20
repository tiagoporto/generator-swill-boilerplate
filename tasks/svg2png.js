//Convert SVG to PNG
module.exports = function (gulp, plugins, basePaths, paths) {
	return function () {
		gulp.src(paths.images.dest + 'svg-sprite.svg')
				.pipe(plugins.svg2png())
				.pipe(gulp.dest(paths.images.dest));
	};
};