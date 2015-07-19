// Compile and Prefix Stylus
gulp.task('stylus', function () {

	return	gulp.src([
					paths.styles.src + '*.styl',
					'!' + paths.styles.src + '_*.styl',
				])
				.pipe(plumber())
				.pipe(stylus({'include css': true})
				    .on('error', function (err) {

						console.log(err.message);

						// If rename the stylus file change here
						file('styles.css', 'body:before{white-space: pre; font-family: monospace; content: "' + err.message + '";}', { src: true })
							.pipe(replace("\\",'/'))
							.pipe(replace(/(\r\n|\n|\r)/gm,'\\A '))
							.pipe(replace("\"",'\''))
							.pipe(replace("content: '",'content: "'))
							.pipe(replace("';}",'";}'))
							.pipe(gulp.dest(paths.styles.dest))
							.pipe(rename({suffix: '.min'}))
							.pipe(gulp.dest(paths.styles.dest));
					})
				)
				.pipe(autoprefixer({
					browsers: ['ie >= 8', 'ie_mob >= 10', 'Firefox > 24', 'last 10 Chrome versions', 'safari >= 6', 'opera >= 24', 'ios >= 6',  'android >= 4', 'bb >= 10']
				}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(csso())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest(paths.styles.dest))
				.pipe(notify({message: 'Styles task complete', onLast: true}));
});