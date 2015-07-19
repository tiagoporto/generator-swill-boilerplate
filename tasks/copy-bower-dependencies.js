// Copy Bower dependencies to specific folders
gulp.task('bower', function() {

	var outdatedBrowserLangs = gulp.src(basePaths.bower + 'outdated-browser/outdatedbrowser/lang/*')
						.pipe(gulp.dest(basePaths.dest + 'lang/outdated_browser'));

	var    fonts    = gulp.src([
							basePaths.bower + 'bootstrap/dist/fonts/*',
							basePaths.bower + 'font-awesome/fonts/*'
						])
						.pipe(gulp.dest(basePaths.dest + 'fonts'));

	return merge(outdatedBrowserLangs, fonts);
});