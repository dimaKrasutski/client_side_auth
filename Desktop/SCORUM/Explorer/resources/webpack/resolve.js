const cwd = process.cwd();
const rxPaths = require('rxjs/_esm5/path-mapping');

module.exports = {
  modules: [cwd, 'node_modules'],
  extensions: ['.js', '.jsx', '.css', '.scss'],
  alias: rxPaths(),
  symlinks: false,
};
