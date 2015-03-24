var ElasticRecord = require('./index');

function ClassMethods() {};
function InstanceMethods() {};

// ClassMethods
Object.defineProperty(ClassMethods.prototype, 'client', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._client) {
			return this._client;
		}

		return ElasticRecord.client;
	},
	set: function(value) {
		Object.defineProperty(this, '_client', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

// InstanceMethods
Object.defineProperty(InstanceMethods.prototype, 'client', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._client) {
			return this._client;
		}

		return this.model.__elasticsearch__.client;
	},
	set: function(value) {
		Object.defineProperty(this, '_client', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

exports.ClassMethods = ClassMethods;
exports.InstanceMethods = InstanceMethods;

