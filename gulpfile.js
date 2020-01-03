"use strict";

let gulp = require("gulp"),
    sass = require("gulp-sass"),
    csso = require("gulp-csso"),
    browserSync = require("browser-sync"),
    cp = require("child_process");

gulp.task("sass", () => {
    return gulp.src("_scss/**/*.scss")
        .pipe(sass().on('error',sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('.docs/css/'))
        .pipe(browserSync.stream({match:'**/*.css'}));
});

gulp.task("copy", () => {
    return gulp.src([
        "_scss/**/*.css"
    ], {base:'_scss/'})
    .pipe(gulp.dest('./docs/css/'));
});

//Jekyll dev build
gulp.task("jekyll-dev", () => {
    return cp.spawn("bundle",
                    ["exec", "jekyll", "build -- baseurl ''"],
                    {stdio: "inherit", shell: true});
                });

// Jekyll build for GH pages
gulp.task("jekyll", () => {
    return cp.spawn("bundle",
                    ["exec", "jekyll", "build"],
                    { stdio: "inherit", shell: true });
                });

gulp.task("watch", () => {
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
			"./_data/*.json"
		]
	).on('change', gulp.series('jekyll-dev', 'sass', 'copy') );

	gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload );
	gulp.watch( 'docs/**/*.css' ).on('change', browserSync.reload );
});

gulp.task("default", gulp.series('jekyll-dev', 'sass', 'copy', 'watch'));

gulp.task("deploy", gulp.series('jekyll', 'sass', 'copy' , () => {
    return cp.spawn('git status && git commit -am "Update docs folder for GHPages" && git pull && git push',
                    { stdio: "inherit", shell: true });
                })
);