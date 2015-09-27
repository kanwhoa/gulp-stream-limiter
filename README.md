gulp-stream-limiter
===================

Limit the number of files passing through a stream

A number of packages, particularly `gulp-svg2png` do not care about
concurrency. In this scenario, they start a large number of processes
which slows/locks the calling machine. This is a simple plugin to rate
limit the number of active files being processed by another plugin.

Example usage.

```javascript
var streamLimiter = require('gulp-stream-limiter');

var limiter = streamLimiter(5);

gulp.task('disk-task1', ['dependency'], diskLock.stream(function() {
  return gulp.src(/*...*/)
             .pipe(limiter.throttler())
             .pipe(someMisbehavingPlugin())
             .pipe(limiter.unthrottler());
  // ...
});
```
This uses the `bluebird` Promises library to set a polling timeout. This
is by no means the best solution to this problem, but it is a solution
that works.

