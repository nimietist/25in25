import dotenv from 'dotenv';
import gulp_ from 'gulp';
import help from 'gulp-help';
import nodemon from 'gulp-nodemon';
import eslint from 'gulp-eslint';
import less from 'gulp-less';
import shell from 'gulp-shell';
import rename from 'gulp-rename';
import browsersync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

dotenv.load();

let gulp = help(gulp_);

// Default
gulp.task('default', ['help']);

// Development
gulp.task('develop', ['dev']);

gulp.task('server', 'Run the development server', function(){
  nodemon({
    script: 'server/index.js',
    exec: './node_modules/.bin/babel-node',
    env: { 'NODE_ENV': 'development' },
    nodeArgs: [ /* '--debug' */ ],
    ignore: [
      'bower_components',
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', browsersync.reload)
  .on('restart', browsersync.reload);
});

gulp.task('dev', 'Run browsersync server', ['server'], function(){
  browsersync.init({
    files: './server/views/*',
    proxy: `localhost:${process.env.PORT}`,
    port: 5000,
    notify: true
  });
});

// Testing

// lint
gulp.task('lint', 'Use eslint to check server and client js', function(){
  gulp.src([
    'app/**/*.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format());
});

// Assets Compilation
gulp.task('assets:js', function() {
  // Single entry point to browserify
  browserify('./client/index.js', {
    insertGlobals: true,
    debug: !process.env.production
  })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js'));
});

// LESS
gulp.task('assets:css', function() {
  // Single entry point to browserify
  gulp.src([
    'assets/css/**/*.less',
    'assets/css/**/*.css'
  ])
    .pipe(less({

    }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('assets', 'Compile static assets (js, css) for cdn', ['assets:js', 'assets:css'], function(){

});

gulp.task('deploy', 'Deploy compiled assets and upload app code', ['assets'], function(){

});
