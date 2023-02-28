var global = typeof window !== 'undefined' ? window : this || Function('return this')();
var nx = global.nx || require('@jswork/next');
var defaults = { context: global };

// var Nx<%- ctx.classify(project_name) %>
nx.<%- ctx.camelize(String(project_name).slice(5)) %> = function (inOptions) {
  var options = nx.mix(null, defaults, inOptions);
  // package codes...
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = nx.<%- ctx.camelize(project_name.slice(5)) %>;
}
