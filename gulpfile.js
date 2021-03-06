'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const jsLib = ['./assets/js/smooth-scroll.min.js'];

gulp.task('sass', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.start('copy-js-lib');
  gulp.start('js-compile');
  gulp.start('copy-imgs');
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['copy-js-lib', 'js-compile']);
});

gulp.task('sass:prod', function () {
  return gulp.src('./assets/scss/main.scss')
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
     }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-imgs', function() {
  return gulp.src('./assets/img/*.png')
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-js-lib', function() {
  return gulp.src(jsLib)
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-compile', function(cb) {
  pump([
    gulp.src('./assets/js/main.js'),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulp.dest('./dist/js')
  ], cb);
});