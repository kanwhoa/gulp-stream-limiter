/**
 * @author kanwhoa
 *
 * Basic module to rate limit a stream. This will use a counter and
 * promises to wait until there is a free slot. In normal concurrent
 * programming, this is a semaphore, but with JavaScript, we have to just
 * give up execution and use a time-based retry.
 */
module.exports = function (limit) {
	return {
		throttler: function() {
		},
		unthrottler: function() {
		}
	};
}

