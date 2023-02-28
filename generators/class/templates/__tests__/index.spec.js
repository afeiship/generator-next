(function () {
  const NxBoilerplateClass = require('../src');

  jest.setTimeout(60 * 1000);

  describe('NxBoilerplateClass.methods', function () {
    test('init', function () {
      const data = { key: 1, value: 2 };
      expect(!!data).toBe(true);
    });
  });
})();
