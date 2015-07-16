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
import debowerify from 'debowerify';
import exorcist from 'exorcist';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import combiner from 'stream-combiner2';

dotenv.load();

const styles = [
  'app/assets/css/**/*.less',
  'app/assets/css/**/*.css'
];

const scripts = [

];

let gulp = help(gulp_);

// Default
gulp.task('default', ['help']);

// Development
gulp.task('develop', ['dev']);

gulp.task('server', 'Run the development server', ['lint', 'assets'], function(){
  nodemon({
    script: 'server.js',
    watch: [
      '!./app/assets', // asset tasks are watching this
      './app'
    ]
  })
  .on('start', browsersync.reload)
  .on('restart', browsersync.reload);
});

gulp.task('dev', 'Run browsersync server', ['server'], function(){
  browsersync.init({
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
  browserify('app/assets/js/main.js', {
    debug: true
  })
  .transform(babelify)
  .transform(debowerify)
  .bundle()
  .on('error', console.error)
  .pipe(exorcist('/build/js/main.js.map'))
  .pipe(source('main.js'))
  .pipe(gulp.dest('./build/js'))
  .pipe(browsersync.stream());
});

// LESS
gulp.task('assets:css', function() {
  var combined = combiner.obj([
    gulp.src(styles)
      .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', console.error)
      .pipe(sourcemaps.write('./'))
      .pipe(rename('main.css'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browsersync.stream())
  ]);
  combined.on('error', console.error.bind(console));
});

gulp.task('assets', 'Compile static assets (js, css) for cdn', ['assets:js', 'assets:css'], function(){
  gulp.watch('app/assets/css/**', ['assets:css']);
  gulp.watch('app/assets/js/*.js', ['assets:js']);
});


// Deployment

gulp.task('publish:js', 'Compile js assets for deployment', function(){

});

gulp.task('publish:css', 'Compile css assets for deployment', function(){

});

gulp.task('publish', 'Deploy compiled assets and upload app code', ['publish:js', 'publish:css'], function(){
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

  return gulp.src('./dist/**')
    .pipe(rename(function (p) {
      p.dirname += '/assets';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
