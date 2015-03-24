var appendFeatures = function(target, src) {
	var names = Object.getOwnPropertyNames(src);

	for (var i = 0; i < names.length; i++) {
		var name = names[i];
		var desc = Object.getOwnPropertyDescriptor(src, name);

		Object.defineProperty(target, name, desc);
	}

	return target;
};

exports.include = function(base, module) {
	appendFeatures(base.prototype, module.prototype);

	if (module.included) {
		module.included(base);
	}
};

exports.extend = function(base, module) {
	appendFeatures(base, module.prototype);

	if (module.extended) {
		module.extended(base);
	}
};

