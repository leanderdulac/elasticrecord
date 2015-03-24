function ClassMethods() {};
function InstanceMethods() {};

InstanceMethods.prototype.asIndexedJson = function() {
	return this.target.toJSON ? this.target.toJSON() : JSON.stringify(this.target);
};

exports.ClassMethods = ClassMethods;
exports.InstanceMethods = InstanceMethods;

