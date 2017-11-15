const path = require('path');
const fs = require('fs');
const assert = require('assert');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const extractCjsDeps = require('../visit-cjs-deps.js');

describe('Transformations', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map(caseName => {
    it(`Should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, 'actual.js');
      const optionsPath = path.join(fixtureDir, 'options.js');
      const exceptionPath = path.join(fixtureDir, 'exception.txt');

      const resolves = [];
      const deps = [];
      
      const ast = babylon.parse(fs.readFileSync(actualPath).toString(), { allowReturnOutsideFunction: true });
      traverse(ast, extractCjsDeps({ deps, resolves }));      
      
      const expected = JSON.parse(fs.readFileSync(path.join(fixtureDir, 'expected.json')).toString());

      assert.deepEqual(deps, expected.deps);

      if (expected.resolves)
        assert.deepEqual(resolves, expected.resolves);
      else
        assert(expected.resolves === undefined);
    });
  });
});
