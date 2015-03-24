var Support = require('./support');
var Serialization = require('./serialization');
var Indexable = require('./indexable');
var Naming = require('./naming');
var Client = require('./client');
var Relations = require('./relations');

function ElasticInstanceProxy(target, model, adapter) {
	this.target = target;
	this.model = model;
	this.adapter = adapter;
};

Support.include(ElasticInstanceProxy, Client.InstanceMethods);
Support.include(ElasticInstanceProxy, Naming.InstanceMethods);
Support.include(ElasticInstanceProxy, Indexable.InstanceMethods);
Support.include(ElasticInstanceProxy, Serialization.InstanceMethods)
Support.include(ElasticInstanceProxy, Relations.InstanceMethods)

module.exports = ElasticInstanceProxy;

