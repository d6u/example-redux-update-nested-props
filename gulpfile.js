'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const debug = require('gulp-debug');
const through2 = require('through2');
const argv = require('yargs').argv;

gulp.task('default', ['copy:html', 'copy:css']);

gulp.task('copy:html', () => {
  return gulp
    .src('src/*/*.html')
    .pipe((() => argv.w ? watch('src/*/*.html') : through2.obj())())
    .pipe(debug({title: 'copy:html'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:css', () => {
  return gulp
    .src('style.css')
    .pipe((() => argv.w ? watch('style.css') : through2.obj())())
    .pipe(debug({title: 'copy:css'}))
    .pipe(gulp.dest('dist'));
});
