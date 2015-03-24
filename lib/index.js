function ElasticRecord() {};

module.exports = ElasticRecord;

var elasticsearch = require('elasticsearch');
var Support = require('./support');
var Model = require('./model');


// Default client
ElasticRecord.client = new elasticsearch.Client({
	host: 'localhost:9200'
});

// Default index
ElasticRecord.indexName = 'elasticrecord';

// Classes
ElasticRecord.Model = Model;
ElasticRecord.Client = elasticsearch;

// Helpers
ElasticRecord.elastify = function(model, options) {
	if (!options) {
		options = {};
	}

	Support.extend(model, Model);

	model.__elasticsearch__.configure(options);
};

