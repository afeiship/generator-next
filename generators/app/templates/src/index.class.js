import nx from '@jswork/next';
const defaults = { context: global };

const Nx<%- ctx.classify(String(project_name).slice(5)) %> = nx.declare('nx.<%- ctx.classify(String(project_name).slice(5)) %>', {
  methods: {
    init: function (inOptions) {
      this.options = nx.mix(null, defaults, inOptions);
    }
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Nx<%- ctx.classify(String(project_name).slice(5)) %>;
}

export default Nx<%- ctx.classify(String(project_name).slice(5)) %>;
