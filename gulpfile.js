var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');  
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jspm = require('gulp-jspm-build');
var webpack = require('gulp-webpack');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('webpack', [], function() {
    return gulp.src('src/decorators.ts')
    .pipe(webpack(require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify-js', ['webpack'], function () {
    return gulp.src('dist/ng1-decorators.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['webpack', 'minify-js']);
