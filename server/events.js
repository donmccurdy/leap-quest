var define = require('requirejs');

define([
	'events/ActorEvent',
	'events/EnvironmentEvent',
	'events/SystemEvent',
	'events/QuestEvent'
], function (A, E, S, Q) {
	module.exports = {
		ActorEvent: A,
		EnvironmentEvent: E,
		SystemEvent: S,
		QuestEvent: Q
	};
});
