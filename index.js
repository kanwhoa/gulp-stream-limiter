'use strict';
/**
 * @author kanwhoa
 *
 * Basic module to rate limit a stream. This will use a counter and
 * promises to wait until there is a free slot. In normal concurrent
 * programming, this is a semaphore, but with JavaScript, we have to just
 * give up execution and use a time-based retry.
 */
var Promise = require("bluebird");
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var spaceLimit;

/**
 * Exported functions
 * @param limit The initial semaphore value
 */
module.exports = function (limit) {
	spaceLimit = limit || 100;

	return {
		throttler: function() {
			var stream = through.obj(function(file, enc, cb) {
				takeSpace(this, file, enc, cb);
			});
			return stream;
		},
		unthrottler: function() {
			var stream = through.obj(function(file, enc, cb) {
				spaceLimit++;
				this.push(file);
				cb();
			});
			return stream;
		}
	};
}

/**
 * Take one of the semaphore spaces
 *
 * @param file The file being processed
 * @param enc The file encoding
 * @param cb The callback to call once we have a spaec
 */
function takeSpace(ctx, file, enc, cb) {
	if (spaceLimit === 0) {
		Promise.delay(500).then(function() {
			takeSpace(ctx, file, enc, cb);
		});
	} else {
		spaceLimit--;
		ctx.push(file);
		cb();
	}
}
