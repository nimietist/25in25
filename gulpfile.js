require('envc')()
var gulp = require('gulp')
var awspublish = require('gulp-awspublish')
var rename = require('gulp-rename')

gulp.task('publish', function () {
  var publisher = awspublish.create({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    params: {
      Bucket: process.env.AWS_BUCKET
    }
  })

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  }

  return gulp.src('./static/*')
    .pipe(rename(function (path) {
      path.dirname += '/static'
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter())
})

gulp.task('default', function () {
  console.log('Run "gulp publish" to deploy')
})
