import nx from '@jswork/next';
const defaults = { context: global };

const Nx<%= exportName %> = nx.declare('nx.<%= exportName %>', {
  methods: {
    init: function (inOptions) {
      this.options = nx.mix(null, defaults, inOptions);
    }
  }
});

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = Nx<%= exportName %>;
}

export default Nx<%= exportName %>;
