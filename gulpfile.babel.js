import dotenv from 'dotenv';
import path from 'path';
import gulp_ from 'gulp';
import help from 'gulp-help';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import less from 'gulp-less';
import sourcemaps from 'gulp-sourcemaps';
import shell from 'gulp-shell';
import rename from 'gulp-rename';
import awspublish from 'gulp-awspublish';
import browsersync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import combiner from 'stream-combiner2';

dotenv.load();

let gulp = help(gulp_);

// Default
gulp.task('default', ['help']);

// Development
gulp.task('develop', ['dev']);

function refreshBrowser(){
  setTimeout(function() {
    browsersync.reload();
  }, 1000);
}
gulp.task('server', 'Run the development server', ['lint', 'assets'], function(){
  nodemon({
    script: 'server.js',
    exec: './node_modules/.bin/babel-node',
    watch: ['./app']
  })
  .on('start', refreshBrowser)
  .on('restart', refreshBrowser);
});

gulp.task('dev', 'Run browsersync server', ['server'], function(){
  browsersync.init({
    files: ['./app/*'],
    proxy: `localhost:${process.env.PORT}`,
    port: 5000
  });
});

// Testing

// Linter
gulp.task('lint', 'Use eslint to check server and client js', function(){
  gulp.src('app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

// Assets Compilation
gulp.task('assets:js', function() {
  // Single entry point to browserify
  browserify('./assets/js/main.js', {
    insertGlobals: true,
    debug: !process.env.production
  })
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.log(err.message);
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(browsersync.stream());
});

// LESS
gulp.task('assets:css', function() {
  var combined = combiner.obj([
    gulp.src([
      'assets/css/vendor/**/*.css',
      'assets/css/**/*.less',
      'assets/css/**/*.css'
    ])
      .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', function(err){ console.log(err.message); })
      .pipe(sourcemaps.write())
      // .pipe(rename('main.css'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browsersync.stream())
  ]);
  combined.on('error', console.error.bind(console));
});

gulp.task('assets', 'Compile static assets (js, css) for cdn', function(){
  gulp.watch('assets/css/**', ['assets:css']);
  gulp.watch('./assets/js/*.js', ['assets:js']);
});

gulp.task('publish', 'Deploy compiled assets and upload app code', ['assets'], function(){
  var publisher = awspublish.create({
    params: {
      Bucket: process.env.AWS_BUCKET
    },
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./public/*.js')
    .pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
