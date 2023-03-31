import nx from '@jswork/next';
const defaults = { context: global };

nx.<%- ctx.camelize(String(project_name).slice(5)) %> = function (inOptions) {
  var options = nx.mix(null, defaults, inOptions);
  // package codes...
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = nx.<%- ctx.camelize(project_name.slice(5)) %>;
}

export default nx.<%- ctx.camelize(project_name.slice(5)) %>;
