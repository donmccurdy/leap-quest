define([
	'view/actor_view/NPCActorView',
	'view/actor_view/PlayerActorView'
], function (N, P) {
	return {
		NPCActorView: N,
		PlayerActorView: P,

		// View Factory
		create: function (attr) {
			return new (this[attr.className + 'View'])(attr);
		}
	};
});
