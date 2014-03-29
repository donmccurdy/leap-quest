define([
	'model/actor_model/NPCActorModel',
	'model/actor_model/PlayerActorModel'
], function (N, P) {
	return {
		NPCActorModel: N,
		PlayerActorModel: P,

		// Model Factory
		create: function (attr) {
			return new (this[attr.className + 'Model'])(attr);
		}
	};
});
