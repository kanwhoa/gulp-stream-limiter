'use strict';

var streamLimiter = require('../');
var assert = require('assert'),
    streamAssert = require('stream-assert'),
    intoStream = require('into-stream');
require('mocha');

describe('gulp-stream-limiter', function() {
	describe('good cases', function() {
		it('should return all inputs', function() {
			intoStream([1, 2, 3])
				.pipe(streamAssert.length(3));
		});
	});
});
