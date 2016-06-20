// Program: gulpfile.js
// Purpose: to minify, concatenate *.js
// Author:  Ray Lai
// Updated: Jun 15, 2016
// Remark:  modified from https://github.com/sidnan/angular-maps/blob/master/gulpfile.js
//
'use strict';
// dependencies
var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

// config
const projectCodePrefix = 'twood';
var listOfCssFiles = 'app/styles/*.css';
var listOfJsFiles = 'app/scripts/*.js';

var concatenatedCssFile = projectCodePrefix + '.css';
var minifiedCssFile = projectCodePrefix + '.min.css';
var concatenatedJsFile = projectCodePrefix + '.js';
var minifiedJsFile = projectCodePrefix + '.min.js';
var buildDirectory = 'dist';

// Lint Task - make sure no error in JS files
gulp.task('verifyJs', function() {
    var jshint = require('gulp-jshint');
    return gulp.src('app/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate CSS files
gulp.task('concatCssFiles', function() {
    return gulp.src(listOfCssFiles)
        .pipe(concat(concatenatedCssFile))
        .pipe(gulp.dest(buildDirectory));
});

// minify CSS files
gulp.task('minifyCssFiles', function() {
    var minifyCss = require('gulp-minify-css');
    return gulp.src(listOfCssFiles)
        .pipe(concat(minifiedCssFile))
        .pipe(minifyCss())
        .pipe(gulp.dest(buildDirectory));
});

// Concatenate JS files
gulp.task('concatJsFiles', function() {
    return gulp.src(listOfJsFiles)
        .pipe(concat(concatenatedJsFile))
        .pipe(gulp.dest(buildDirectory));
});

// minify JS files
gulp.task('minifyJsFiles', function() {
    var uglify = require('gulp-uglify');
    return gulp.src(listOfJsFiles)
        .pipe(concat(minifiedJsFile))
        .pipe(uglify())
        .pipe(gulp.dest(buildDirectory));
});


//clean build directory
gulp.task('cleanBuildDirectory', function() {
  var del = require('del');
  return del([buildDirectory+'/*'], function (err, deletedFiles) {
    console.log('Files deleted:', deletedFiles.join(', '));
    });
});

//task to prepare production package
gulp.task('prepareBuildPackage', function () {
    runSequence('verifyJs', 'cleanBuildDirectory',
      'concatCssFiles', 'minifyCssFiles',
      'concatJsFiles','minifyJsFiles'
    );
});

//http server setup
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: ['example'],
    port: 7070
  });
});

// copy CSS files to example folder
gulp.task('copyCssFilesToExample', function() {
    // var minifyCss = require('gulp-minify-css');
    return gulp.src(listOfCssFiles)
        .pipe(concat(concatenatedCssFile))
        // .pipe(minifyCss())
        .pipe(gulp.dest('example/css'));
});

// copy JS files to example folder
gulp.task('copyJsFilesToExample', function() {
    // var uglify = require('gulp-uglify');
    return gulp.src(listOfJsFiles)
        .pipe(concat(concatenatedJsFile))
        // .pipe(uglify())
        .pipe(gulp.dest('example/js'));
});


// Watch src Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/scripts/*.js', ['verifyJs', 'copyJsFilesToExample']);
    gulp.watch('app/styles/*.css', ['copyCssFilesToExample']);
});

//default gulp command starts http server
gulp.task('default', function () {
    runSequence('verifyJs', 'copyJsFilesToExample', 'copyCssFilesToExample', 'connect', 'watch');
});
