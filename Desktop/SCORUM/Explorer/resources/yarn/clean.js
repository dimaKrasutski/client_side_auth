const rimraf = require('rimraf');
const util = require('util');
const path = require('path');

const cwd = process.cwd();
const rimrafPromise = util.promisify(rimraf);

async function clearAll() {
  return Promise.all([
    rimrafPromise(path.resolve(cwd, 'dist')),
    rimrafPromise(path.resolve(cwd, '.etmp')),
    rimrafPromise(path.resolve(cwd, 'reports')),
    rimrafPromise(path.resolve(cwd, 'node_modules')),
  ]);
}

(async () => {
  await clearAll();
  console.log('Cleared');
})();
