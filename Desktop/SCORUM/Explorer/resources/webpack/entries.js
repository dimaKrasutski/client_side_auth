const cwd = process.cwd();
const path = require('path');

module.exports = {
  'static/theme': [
    // Include scorum theme
    path.resolve(cwd, 'node_modules/@scorum/theme-bootstrap/src/theme/index'),
  ],
  'static/main': [
    // Include babel polyfill to older browsers (e.g. IE 11)
    'babel-polyfill',
    // Include app
    path.join(
      cwd,
      'src/app'
    ),
  ],
};
