// Clean Directories
gulp.task('clean', function (cb) {
	del([
			basePaths.build,
			paths.styles.dest,
			paths.scripts.dest,
			paths.images.dest + '**/*',
			// Add here the folders that will not be deleted in public/img
			'!' + paths.images.dest + 'copyright{,**/*{,**/*}}',
			'!' + paths.images.dest + 'logos{,**/*{,**/*}}'
		], cb)
});