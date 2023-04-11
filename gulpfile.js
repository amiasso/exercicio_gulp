const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const unglify = require ('gulp-uglify');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}


function comprimeJavaScript(){
    return gulp.src('./source/styles/*.s')
    .pipe(unglify())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    console.log("executando via gulp");
    callback();
}


exports.default = function(){
    gulp.watch('./source/styles/*.scss',{ ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js',{ ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*.',{ ignoreInitial: false }, gulp.series(comprimeImagens));
}


