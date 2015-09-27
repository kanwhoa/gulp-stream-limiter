gulp-stream-limiter
===================

Limit the number of files passing through a stream

A number of packages, particularly gulp-svg2png do not care about
concurrency. In this scenario, they start a large number of processes
which slows/locks the calling machine. This is a simple plugin to rate
limit the number of active files being processed by another plugin.

