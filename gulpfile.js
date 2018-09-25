const gulp = require('gulp');
const webpack = require('webpack-stream');
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
      .pipe(plugins.babel())
      .pipe(plugins.uglifyEs.default())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'), {
      overwrite: true
    })
});

// handles bundling assets for local testing/development
gulp.task('js:other', () => {
  return gulp.src('./src/js/index.js')
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/js'), {
      overwrite: true
    })
})

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
    .pipe(gulp.dest('public/css', {
      overwrite: true
    }))
});

gulp.task('watch', ['js:navigation', 'js:other', 'sass:main', 'sass:other'], () => {
  console.log('watching files');
  gulp.watch(['./src/js/Navigation/Navigation.js'], ['js:navigation']);
  gulp.watch(['!./src/js/Navigation/Navigation.js', './src/js/**/*.js'], ['js:other']);
  gulp.watch(['./src/scss/main.scss'], ['sass:main']);
  gulp.watch(['!./src/scss/main.scss', './src/scss/**/*.scss'], ['sass:other']);
});

gulp.task('default', ['js:navigation', 'sass:main']);