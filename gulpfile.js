var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');  
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build-js', function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('minify-js', ['build-js'], function () {
    return gulp.src('dist/ng1-decorators.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['build-js', 'minify-js']);
