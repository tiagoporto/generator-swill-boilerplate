// Generate SVG Sprite
gulp.task('svg-sprite', function() {
	return gulp.src(paths.sprite.svg + '*.svg')
				.pipe(plumber())
				.pipe(svgSprite({
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
				.pipe(notify({message: 'SVG sprite task complete', onLast: true}));
});