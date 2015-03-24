var ElasticRecord = require('./index');

function ClassMethods() {};
function InstanceMethods() {};

// ClassMethods
Object.defineProperty(ClassMethods.prototype, 'indexName', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._indexName) {
			return this._indexName;
		}

		return ElasticRecord.indexName;
	},
	set: function(value) {
		Object.defineProperty(this, '_indexName', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

Object.defineProperty(ClassMethods.prototype, 'indexType', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._indexType) {
			return this._indexType;
		}

		return this.adapter.getIndexType(this.target);
	},
	set: function(value) {
		Object.defineProperty(this, '_indexType', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

// InstanceMethods
Object.defineProperty(InstanceMethods.prototype, 'indexName', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._indexName) {
			return this._indexName;
		}

		return this.model.__elasticsearch__.indexName;
	},
	set: function(value) {
		Object.defineProperty(this, '_indexName', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

Object.defineProperty(InstanceMethods.prototype, 'indexType', {
	configurable: false,
	enumerable: true,
	get: function() {
		if (this._indexType) {
			return this._indexType;
		}

		return this.model.__elasticsearch__.indexType;
	},
	set: function(value) {
		Object.defineProperty(this, '_indexType', {
			configurable: true,
			enumerable: false,
			value: value
		});
	}
});

exports.ClassMethods = ClassMethods;
exports.InstanceMethods = InstanceMethods;

