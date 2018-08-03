const gulp = require('gulp');
const browserSync = require('browser-sync');
const jshint = require('jshint');
const stylish = require('jshint-stylish');
const pluginOptions = {
  DEBUG: true,
  camelize: true,
  lazy: true
}

const plugins = require('gulp-load-plugins')(pluginOptions);

const onError = err => { console.log(`Error -> ${err}`); };

gulp.task('js:navigation', () => {
  return gulp.src('./src/js/Navigation/Navigation.js')
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stripCode({
        start_comment: "start-remove",
        end_comment: "end-remove"
      }))
      .pipe(plugins.babel())
      .pipe(plugins.uglifyEs.default())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'), {
      overwrite: true
    })
    .pipe(browserSync.stream());
});

gulp.task('sass:main', () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: 'compressed'
      }))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist', {
      overwrite: true
    }))
    .pipe(browserSync.stream());
});

gulp.task('sass:other', () => {
  return gulp.src('./src/scss/styles.scss')
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('public/build', {
      overwrite: true
    }))
    .pipe(browserSync.stream());
});

gulp.task('watch', ['js:navigation', 'sass:main', 'sass:other'], () => {
  console.log('watching files');
  gulp.watch(['./src/js/Navigation/Navigation.js'], ['js:navigation']);
  gulp.watch(['./src/scss/main.scss'], ['sass:main']);
  gulp.watch(['!./src/scss/main.scss', './src/scss/**/*.scss'], ['sass:other']);
});

// gulp.task('default')