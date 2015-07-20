// Generate SVG Sprite
module.exports = function (gulp, plugins, basePaths, paths) {
	return function () {
		gulp.src(paths.sprite.svg + '*.svg')
			.pipe(plugins.plumber())
			.pipe(plugins.svgSprite({
				shape : {
					spacing : {
						padding : 2
					}
				},
				mode : {
					css : {
						dest : './',
						sprite: '../' + basePaths.images. dest + 'svg-sprite.svg',
						layout: 'vertical',
						bust : false,
						render : {
							styl : {dest: '../../' + paths.styles.src + 'helpers/_svg-sprite.styl'}
						}
					}
				}
			}))
			.pipe(gulp.dest(paths.images.dest))
			.pipe(plugins.notify({message: 'SVG sprite task complete', onLast: true}));
	};
};