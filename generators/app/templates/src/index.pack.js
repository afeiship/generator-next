import nx from '@jswork/next';
const defaults = { context: global };

nx.<%= exportName %> = function (inOptions) {
  var options = nx.mix(null, defaults, inOptions);
  // package codes...
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.<%= exportName %>;
}

export default nx.<%= exportName %>;
