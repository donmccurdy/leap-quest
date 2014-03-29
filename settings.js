var _ = require('lodash');
var env = process.env;

/**
 * URGENT: These settings are automatically made
 * 	available on the front end. Sensitive information
 *	should remain in process.env.
 */

// Load .env if it's missing (for node-inspector)
if (!env.QUEST_ENV) {
	var dotenv = new (require('dotenv-node'))();
}

// Global environment
var settings = module.exports = {
	env:		env.QUEST_ENV,
	version:	env.QUEST_VERSION,
	protocol:	env.QUEST_PROTOCOL,
	host:		env.QUEST_HOST,
	port:		env.QUEST_PORT
};

// Validation
_.each(settings, function (value, setting) {
	if (!value) {
		console.error('Environment failed to specify: ' + setting);
		process.exit(1);
	}
});
