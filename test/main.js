'use strict';

var streamLimiter = require('../');
var assert = require('assert'),
    streamAssert = require('stream-assert'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    File = require('vinyl'),
    streamify = require('stream-array'),
    os = require('os');

require('mocha');
var PluginError = gutil.PluginError;
var limiter = streamLimiter(5);

describe('gulp-stream-limiter', function() {

	describe('good cases', function() {
		it('should return all inputs', function(done) {
			//this.timeout(15000);
			streamify(streamContentGenerator(100))
				.pipe(limiter.throttler())
				.pipe(gutil.noop())
				.pipe(limiter.unthrottler())
				.pipe(streamAssert.length(100))
				.pipe(streamAssert.end(done));
		});
	});

	// TODO: test for a non-released file
	/*
	describe('error cases', function() {
		it('should timeout', function(done) {
			streamify(streamContentGenerator(100))
				.pipe(limiter.throttler())
				.pipe(streamAssert.end(done));
		});
	});
	*/
});


/**
 * Generate some content for testing
 * 
 * @param max The maximum length of the returned array
 */
function streamContentGenerator(max) {
	var i=0;
	var ret = [];
	for (i=0; i<max; i++) {
		ret.push(new File({
			path: i+".js",
			contents: new Buffer("file "+i)
		}));
	}
	return ret;
}
