# Babel CJS dependencies extraction plugin

```js
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const extractCjsDeps = require('babel-visit-cjs-deps');

const resolves = [];
const deps = [];

const ast = babylon.parse(`
require('x');
require('x/' + 'b');
require.resolve('asdf/');
`, { allowReturnOutsideFunction: true });

traverse(ast, extractCjsDeps({ deps, resolves }));

deps;     // ['x', 'x/']
resolves; // ['adsf/']
```

Currently no support for dynamic requires.

No actual transformations are performed at all.

## License

MIT
