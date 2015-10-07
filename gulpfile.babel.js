import dotenv from 'dotenv'
import gulp_ from 'gulp'
import help from 'gulp-help'
import nodemon from 'gulp-nodemon'
import standard from 'gulp-standard'
// import less from 'gulp-less'
// import sourcemaps from 'gulp-sourcemaps'
// import shell from 'gulp-shell'
import rename from 'gulp-rename'
import awspublish from 'gulp-awspublish'
import browsersync from 'browser-sync'
// import webpack from 'webpack'
// import webpackConfig from './webpack.config'
import browserify from 'browserify'
import debowerify from 'debowerify'
import exorcist from 'exorcist'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
// import combiner from 'stream-combiner2'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.dev.config'

dotenv.load()

let gulp = help(gulp_)

// Default
gulp.task('default', ['help'])

// Development
gulp.task('develop', ['dev'])

gulp.task('server', 'Run the development server', ['lint', 'browserify'], () => {
  nodemon({
    script: 'server.js',
    ext: 'js, jade',
    watch: [
      // '!./app/assets', // asset tasks are watching this
      './app'
    ]
  })
    // .on('start', browsersync.reload)
    // .on('restart', browsersync.reload)
})

gulp.task('dev', 'Run browsersync server', ['server', 'webpack-dev-server'], () => {
  browsersync.init({
    proxy: `localhost:${process.env.PORT}`,
    port: 5000
  })
})

// Testing

gulp.task('lint', 'Use standard to check server and client js', () => {
  gulp.src('app/**/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default'))
})

// Assets Compilation
gulp.task('browserify', ['lint'], function () {
  browserify('app/assets/js/main.js', {
    debug: true,
    require: 'jquery'
  })
    .transform(babelify)
    .transform(debowerify)
    .bundle()
    .on('error', console.error)
    .pipe(exorcist('/build/js/main.js.map'))
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browsersync.stream())
})

gulp.task('webpack-dev-server', function (callback) {
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', console.error)
})

gulp.task('publish', 'Deploy compiled assets and upload app code', ['browserify'], () => {
  var publisher = awspublish.create({
    params: {
      Bucket: process.env.AWS_BUCKET
    },
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  })

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  }

  return gulp.src('./dist/**')
    .pipe(rename(function (p) {
      p.dirname += '/assets'
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
})
