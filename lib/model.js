var Support = require('./support');
var Adapter = require('./adapter');
var ElasticModelProxy = require('./model-proxy');
var ElasticInstanceProxy = require('./instance-proxy');

var PublicClassMethods = [];
var PublicInstanceMethods = ['asIndexedJson', 'indexDocument', 'destroyDocument', 'disableIndexation', 'enableIndexation', 'setIndexation'];

var setupProxy = function(proxy, methods, model, adapter, set) {
	set('__elasticsearch__', {
		enumerable: false,
		configurable: false,
		get: function() {
			if (!this.___elasticsearch___) {
				Object.defineProperty(this, '___elasticsearch___', {
					configurable: false,
					enumerable: false,
					value: new proxy(this, model, adapter)
				});
			}

			return this.___elasticsearch___;
		}
	}, true);

	set('elasticsearch', {
		enumerable: false,
		configurable: false,
		get: function() {
			return this.__elasticsearch__;
		}
	});

	methods.forEach(function(name) {
		set(name, {
			enumerable: false,
			configurable: true,
			value: function() {
				return this.__elasticsearch__[name].apply(this.__elasticsearch__, arguments);
			}
		});
	});
};

function Model() {};

Model.extended = Model.included = function(base) {
	var adapter = Adapter.fromClass(base);

	// Setup class methods
	setupProxy(ElasticModelProxy, PublicClassMethods, base, adapter, function(name, value, force) {
		if (!adapter.hasClassVariable(base, name) || force) {
			adapter.setClassVariable(base, name, value);
		}
	});

	// Setup instance methods
	setupProxy(ElasticInstanceProxy, PublicInstanceMethods, base, adapter, function(name, value, force) {
		if (!adapter.hasInstanceVariable(base, name) || force) {
			adapter.setInstanceVariable(base, name, value);
		}
	});

	// Setup per adapter mixins
	adapter.setupClass(base);
};

module.exports = Model;

