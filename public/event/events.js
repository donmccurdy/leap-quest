define([
	'events/ActorEvent',
	'events/EnvironmentEvent',
	'events/SystemEvent',
	'events/QuestEvent',
	'events/ZoneEvent'
], function (A, E, S, Q, Z) {
	return {
		ActorEvent: A,
		EnvironmentEvent: E,
		SystemEvent: S,
		QuestEvent: Q,
		ZoneEvent: Z,

		// Event Factory
		create: function (attr) {
			return new (this[attr.eventClass])(attr);
		}
	};
});
