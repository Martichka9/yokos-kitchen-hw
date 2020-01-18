"use strict";

let gulp = require("gulp"),
    csso = require("gulp-csso"),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	cp = require("child_process");

gulp.task("sass", function() {
	return gulp.src( '_scss/**/*.scss')
		.pipe( sass().on('error', sass.logError) )
		.pipe( csso() )
		.pipe( gulp.dest( './docs/assets/css/' ) )
		.pipe( browserSync.stream({ match: '**/*.css' }) )
	;
});

gulp.task('copy', function() {
    return gulp.src([
		'_scss/**/*.css',
		'_scss/**/*.eot',
		'_scss/**/*.svg',
		'_scss/**/*.ttf',
		'_scss/**/*.woff',
		'_scss/**/*.woff2',
	], {base:'_scss/'})
        .pipe(gulp.dest('./docs/assets/css/'));
});

//Copy json data file
gulp.task('copy-json', function() {
    return gulp.src([
		'_data/*.json'
	], {base:'_data/'})
        .pipe(gulp.dest('./docs/assets/data/'));
});

// Jekyll
gulp.task("jekyll-dev", function() {
	return cp.spawn("bundle", ["exec", "jekyll", "build --baseurl ''"], { stdio: "inherit", shell: true });
});

// Jekyll
gulp.task("jekyll", function() {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
});

gulp.task("watch", function() {

	browserSync.init({
		server: {
            baseDir: "./docs/"
		}
	});

	gulp.watch( '_scss/**/*.scss', gulp.series('sass') );

	gulp.watch(
		[
			"./*.html",
			"./*.yml",
			"./_includes/*.html",
			"./_layouts/*.html",
			"./assets/**/*.js",
			"./_data/*.json"
		]
    ).on('change', gulp.series('jekyll-dev', 'sass', 'copy','copy-json') );
    //).on('change', gulp.series('jekyll-dev', 'sass') );

	gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.js' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.json' ).on('change', browserSync.reload );
});

gulp.task("default", gulp.series('jekyll-dev', 'sass', 'copy',  'copy-json', 'watch'));
//gulp.task("default", gulp.series('jekyll-dev', 'sass', 'watch'));

gulp.task("deploy", gulp.series('jekyll', 'sass', 'copy' , function() {
//gulp.task("deploy", gulp.series('jekyll', 'sass', function() {
	return cp.spawn('git status && git commit -am "Update docs folder for GHPages, img alt + page lang fixes, " && git pull && git push', { stdio: "inherit", shell: true });
}));