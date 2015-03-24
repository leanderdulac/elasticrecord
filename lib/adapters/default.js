function DefaultAdapter() {};

DefaultAdapter.hasClassVariable = function(klass, name) {
	return name in obj;
};

DefaultAdapter.setClassVariable = function(klass, name, desc) {
	Object.defineProperty(obj, name, desc);
};

DefaultAdapter.hasInstanceVariable = function(klass, name) {
	return name in obj.prototype;
};

DefaultAdapter.setInstanceVariable = function(klass, name, desc) {
	Object.defineProperty(obj.prototype, name, desc);
};

DefaultAdapter.setupClass = function(klass) {
	
};

DefaultAdapter.getDocumentId = function(instance) {
	return instance.id;
};

module.exports = DefaultAdapter;

