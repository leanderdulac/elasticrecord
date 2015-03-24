var Support = require('./support');
var Client = require('./client');
var Serialization = require('./serialization');
var Indexable = require('./indexable');
var Naming = require('./naming');
var Relations = require('./relations');

function ElasticModelProxy(target, model, adapter) {
	this.target = target;
	this.model = model;
	this.adapter = adapter;
};

ElasticModelProxy.prototype.configure = function(options) {
	this.options = options;
};

Support.include(ElasticModelProxy, Client.ClassMethods);
Support.include(ElasticModelProxy, Naming.ClassMethods);
Support.include(ElasticModelProxy, Indexable.ClassMethods);
Support.include(ElasticModelProxy, Serialization.ClassMethods)
Support.include(ElasticModelProxy, Relations.ClassMethods)

module.exports = ElasticModelProxy;


