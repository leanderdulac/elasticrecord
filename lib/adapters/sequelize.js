var Inflect = require('inflected');
var Sequelize = null;
var Adapter = require('../adapter');

try {
	Sequelize = require('sequelize')
} catch(e) {}

function SequelizeAdapter() {};

SequelizeAdapter.hasClassVariable = function(klass, name) {
	return name in klass;
};

SequelizeAdapter.setClassVariable = function(klass, name, desc) {
	Object.defineProperty(klass, name, desc);
};

SequelizeAdapter.hasInstanceVariable = function(klass, name) {
	return name in klass.Instance.prototype;
};

SequelizeAdapter.setInstanceVariable = function(klass, name, desc) {
	Object.defineProperty(klass.Instance.prototype, name, desc);
};

SequelizeAdapter.setupClass = function(klass) {
	klass.hook('afterCreate', function(instance) {
		return instance.__elasticsearch__.notifyChange();
	});

	klass.hook('afterSave', function(instance) {
		return instance.__elasticsearch__.notifyChange();
	});
};

SequelizeAdapter.getIndexType = function(model) {
	return Inflect.tableize(model.name);
};

SequelizeAdapter.getDocumentId = function(instance) {
	return instance.id;
};

module.exports = SequelizeAdapter;

Adapter.register(SequelizeAdapter, function(klass) {
	return Sequelize && klass instanceof Sequelize.Model;
});

