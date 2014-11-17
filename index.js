'use strict';
var Filter = require('broccoli-filter');
var jade = require('jade');

// Custom escape filter
jade.filters.escape = function( block ) {
  return block
    .replace( /&/g, '&amp;'  )
    .replace( /</g, '&lt;'   )
    .replace( />/g, '&gt;'   )
    .replace( /"/g, '&quot;' )
    .replace( /#/g, '&#35;'  )
    .replace( /\\/g, '\\\\'  )
};


function JadeFilter(inputTree, options) {
	if (!(this instanceof JadeFilter)) {
		return new JadeFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.options = options || {};
}

JadeFilter.prototype = Object.create(Filter.prototype);
JadeFilter.prototype.constructor = JadeFilter;

JadeFilter.prototype.extensions = ['jade'];
JadeFilter.prototype.targetExtension = 'html';

JadeFilter.prototype.processString = function (str) {
	return jade.compile(str, this.options)(this.options.data);
};

module.exports = JadeFilter;
