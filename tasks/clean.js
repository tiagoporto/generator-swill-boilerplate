// Clean Directories
module.exports = function (gulp, basePaths, paths, plugins) {
	return function (cb) {
		plugins.del([
				basePaths.build,
				paths.styles.dest,
				paths.scripts.dest,
				paths.images.dest + '**/*',
				// Add here the folders that will not be deleted in public/img
				'!' + paths.images.dest + 'copyright{,**/*{,**/*}}',
				'!' + paths.images.dest + 'logos{,**/*{,**/*}}'
			], cb)
	};
};

