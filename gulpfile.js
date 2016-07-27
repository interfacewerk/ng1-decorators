var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');

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
