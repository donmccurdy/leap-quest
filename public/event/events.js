define([
	'events/ActorEvent',
	'events/EnvironmentEvent',
	'events/SystemEvent',
	'events/QuestEvent'
], function (A, E, S, Q) {
	return {
		ActorEvent: A,
		EnvironmentEvent: E,
		SystemEvent: S,
		QuestEvent: Q
	};
});
