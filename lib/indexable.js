var _ = require('lodash');
var Promise = require('bluebird');

function ClassMethods() {};
function InstanceMethods() {};

// InstanceMethods
InstanceMethods.prototype.indexDocument = function(options) {
	var body = Promise.bind(this)
	.then(function() {
		return this.target.asIndexedJson(options);
	})
	.then(function(data) {
		return this.coerceData(data);
	})
	.then(function(data) {
		return this.client.index(_.defaults({}, options, {
			index: this.indexName,
			type: this.indexType,
			id: this.adapter.getDocumentId(this.target),
			body: data
		}));
	});
};

InstanceMethods.prototype.destroyDocument = function(options) {
	return this.client.delete(_.defaults({}, options, {
		index: this.indexName,
		type: this.indexType,
		id: this.adapter.getDocumentId(this)
	}));
};

InstanceMethods.prototype.coerceData = function(data) {
	return data;
};

InstanceMethods.prototype.notifyChange = function() {
	return this.indexDocument();
};

// ClassMethods
ClassMethods.prototype.search = function(options) {
	return this.client.search(_.defaults({
		index: this.indexName,
		type: this.indexType
	}, options));
};

exports.ClassMethods = ClassMethods;
exports.InstanceMethods = InstanceMethods;

