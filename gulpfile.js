const del = require('del')
const gulp = require('gulp')
const webpack = require('webpack-stream')
const path = require('path')

const pluginOptions = {
  DEBUG: true,
  camelize: true,
  lazy: true
}

const plugins = require('gulp-load-plugins')(pluginOptions)

const paths = {
  js: {
    navSrc: 'src/js/Navigation/Navigation.js',
    indexJsSrc: 'src/js/index.js'
  },
  styles: {
    main: 'src/scss/main.scss',
  }
}

const webpackConfig = process.env.NODE_ENV !== 'production' ? 
  require('./webpack.dev') : 
  require('./webpack.prod')

const onError = err => console.log(`Error -> ${err}`)

const clean = () => del([ 'build', 'dist' ])

const navJs = () => {
  return gulp.src(paths.js.navSrc)
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stripCode({
        start_comment: 'strip-code',
        end_comment: 'end-strip-code'
      }))
      .pipe(webpack(webpackConfig))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
}

const indexJs = () => {
  return gulp.src(paths.js.indexJsSrc)
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public', 'js')
      }
    }))
    .pipe(gulp.dest('public/js'))
}

const sassMain = () => {
  return gulp.src(paths.styles.main)
    .pipe(plugins.plumber({
      errorHandler: onError
    }))
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: 'compressed'
      }))
      .pipe(plugins.autoprefixer({
        grid: "autoplace"
      }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
}

gulp.task('clean', gulp.series(clean))

gulp.task('watch', () => {

  const files = [
    paths.js.navSrc,
    paths.js.indexJsSrc,
    paths.styles.main
  ]

  gulp.watch(
    files,
    { ignoreInitial: false },
    gulp.parallel(navJs, indexJs, sassMain)
  )
})

gulp.task('build', gulp.parallel(navJs, indexJs, sassMain))

gulp.task('default', 
  gulp.series(
    clean, 
    gulp.parallel(navJs, indexJs, sassMain)
  )
)