/**
 * ModelList: Utility collection for Model objects.
 *
 * @TODO donmccurdy - this is gradually becoming
 * 	something that various libraries would do better.
 */
define(['public/util/AbstractList'], function (Parent) {
	var Self = function () {
		Parent.apply(this, arguments);
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.export = function (target) {
		_.each(this.hash, function (model) {
			target.triggerRemote(model.export());
		});
	};

	Self.prototype.triggerRemote = function (event, source) {
		source = source && source.get('id');
		_.each(this.hash, function (model) {
			if (!source || source !== model.get('id')) {
				model.triggerRemote(event);
			}
		});
	}

	return Self;
});