define(function () {

	var Self = function (relay) {
		this.relay = relay;
		this.sync();
	};

	Self.prototype.getCurrent = function () {
		return _.now() + this.localDelta;
	};

	Self.prototype.getDelta = function () {
		var current = this.getCurrent();
		var elapsed = current - this.previous;
		this.previous = current;
		return elapsed;
	};

	Self.prototype.sync = function () {
		/**
		 TODO donmccurdy - A simple timesync implementation:
			1. Client stamps current local time on a "time request" packet and sends to server
			2. Upon receipt by server, server stamps server-time and returns
			3. Upon receipt by client, client subtracts current time from sent time and divides
				by two to compute latency. It subtracts current time from server time to
				determine client-server time delta and adds in the half-latency to get the
				correct clock delta. (So far this algothim is very similar to SNTP)
			4. The first result should immediately be used to update the clock since it will get
				the local clock into at least the right ballpark (at least the right timezone!)
			5. The client repeats steps 1 through 3 five or more times, pausing a few seconds
				each time. Other traffic may be allowed in the interim, but should be minimized
				for best results
			6. The results of the packet receipts are accumulated and sorted in lowest-latency
				to highest-latency order. The median latency is determined by picking the
				mid-point sample from this ordered list.
			7. All samples above approximately 1 standard-deviation from the median are
				discarded and the remaining samples are averaged using an arithmetic mean.
		**/
		this.localDelta = 0;
		this.previous = this.previous
			? this.previous + this.localDelta
			: this.getCurrent();

		setTimeout(_.bind(this.sync, this), 10000);
	};

	return Self;
});