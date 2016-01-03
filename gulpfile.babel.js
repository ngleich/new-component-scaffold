'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import browserify from 'browserify';
import babelify from 'babelify';
//try to put this on $
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';



const $ = gulpLoadPlugins();

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src('src/js/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failOnError()))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src(['src/*'], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enables ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('scripts', () =>
  // gulp.src([
  //   './src/js/main.js'
  // ])
  browserify('./src/js/main.js', { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    //.pipe($.newer('.tmp/js'))
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/js'))

    //dist
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe(gulp.dest('dist/js'))
);

// Clean output directory
gulp.task('clean', cb => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['clean', 'lint','scripts'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'BS',
    //scrollElementMapping: ['main', '.mdl-layout'],
    // https: true,
    server: ['.tmp', 'dist', 'demo'],
    port: 3000
  });

  gulp.watch(['src/js/**/*.js'], ['lint', 'scripts']);
});

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(['lint', 'scripts', 'copy'], cb)
);

