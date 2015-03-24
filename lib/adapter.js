var DefaultAdapter;

function Adapter() {};

Adapter.adapters = [];

Adapter.register = function(klass, condition) {
	this.adapters.push({
		klass: klass,
		condition: condition
	});
};

Adapter.fromClass = function(klass) {
	for (var i = 0; i < this.adapters.length; i++) {
		var adapter = this.adapters[i];

		if (adapter.condition(klass)) {
			return adapter.klass;
		}
	}

	return DefaultAdapter;
};

module.exports = Adapter;

// Load default adapter
DefaultAdapter = require('./adapters/default');

// Load general adapters
require('./adapters/sequelize');

