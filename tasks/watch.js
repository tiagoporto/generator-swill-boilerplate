
// Watch
gulp.task('watch', function () {
	browserSync(browserSyncConfig);

	// Watch .bmp .gif .jpg .jpeg .png and .svg files
	gulp.watch([
			paths.images.src + '**/*.{bmp,gif,jpg,jpeg,png,svg}',
			'!' + paths.sprite.bitmap + '**/*',
			'!' + paths.sprite.svg + '**/*'],

			['images', browserSync.reload]
		 );

	// Watch bitmap sprite files
	gulp.watch(
			paths.sprite.bitmap + '**/*.{png,jpg,gif}',

			['bitmap-sprite', browserSync.reload]
		);

	// Watch svg sprite files
	gulp.watch(
			paths.sprite.svg + '**/*.svg',

			['svg-sprite', 'stylus', browserSync.reload]
		);

	// Watch svg sprite generate
	gulp.watch(
			paths.images.dest + 'svg-sprite.svg',

			['svg2png', browserSync.reload]
		);

	// Watch .js files
	gulp.watch([
			paths.scripts.src + '**/*.js',
			'!' + paths.scripts.src + 'dependencies/**/*.js'],

			['scripts', browserSync.reload]
		);

	// Watch dependencies .js files
	gulp.watch(
			paths.scripts.src + 'dependencies/**/*.js',

			['dependence-scripts', browserSync.reload]
		);

	// Watch .styl files
	gulp.watch([
			paths.styles.src + '**/*.{styl,css}',
			'!' + paths.styles.src + 'helpers/mixins/*.styl',
			'!' + paths.styles.src + 'helpers/functions/*.styl'],

			['stylus', browserSync.reload]
		);

	// Watch .styl Helpers and Functions files
	gulp.watch([
			paths.styles.src + 'helpers/mixins/*.styl',
			paths.styles.src + 'helpers/functions/*.styl'],

			['stylus-helpers']
		);

	//Watch .html and .php Files
	gulp.watch(
			basePaths.dest + '**/*.{html,php}',

			browserSync.reload
		);
});