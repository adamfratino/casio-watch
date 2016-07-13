'use strict';

const src = './_src';
const dest = './_dist';

// REQUIRE VARIOUS
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// REQUIRE CSS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var nano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var stylelint = require('stylelint');
var reporter = require("postcss-reporter");

// REQUIRE JS
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');

// REQUIRE HTML
var htmlmin = require('gulp-htmlmin');

// BUILD HTML
gulp.task('html', function() {
  gulp.src(src + '/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream:true})); // Fire Browsersync
});

// BUILD CSS
var supportedBrowsers = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 9',
    'ff >= 20',
    'ios 6',
    'android 4'
];

gulp.task('css', function () {
  gulp.src(src + '/assets/styles/**/*.scss')
    // .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass().on('error', sass.logError)) // Run SASS
    .pipe(postcss([
      // http://stylelint.io/?docs/user-guide/rules.md
      stylelint({ /* options located in ./.stylelintrc */ }),
      reporter({ clearMessages: true })
    ]))
    .pipe(nano({
      zindex: false,
      autoprefixer: {
        browsers: supportedBrowsers,
        add: true
      }
    })) // Run CSSNano
    // .pipe(sourcemaps.write()) // Write sourcemaps
    .pipe(gulp.dest(dest + '/assets/css')) // Output CSS
    .pipe(browserSync.reload({stream:true})); // Fire Browsersync
});

// BUILD JS
// TODO: build out separate files for app and vendor
// gulp.task('js', function() {
//
gulp.task('js', function() {
  return gulp.src(src + '/assets/scripts/**/*.js')
    .pipe(eslint({ /* options located in ./.eslintrc */ }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    // .pipe(sourcemaps.init())
    // .pipe(babel({ presets: ['es2015'] }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest + '/assets/js/'))
    .pipe(browserSync.reload({stream:true})); // Fire Browsersync
});

gulp.task('fonts', function() {
  gulp.src(src + '/assets/fonts/**/*')
    .pipe(gulp.dest(dest + '/assets/fonts'));
});

// LAUNCH BROWSERSYNC
gulp.task('browser-sync', function() {
  browserSync.init({
    server: { baseDir: dest }
  });
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(src + '/**/*.html', ['html']);
  gulp.watch(src + '/assets/styles/**/*.scss', ['css']);
  gulp.watch(src + '/assets/scripts/**/*.js', ['js']);
});
