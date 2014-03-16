define({
	host: 'localhost',
	port: 5000,
	version: 0.1,
	protocol: 'ws://',

	getSocketURL: function () {
		return [
			this.protocol,
			this.host,
			':',
			this.port,
			'?v=',
			this.version
		].join('');
	}
});