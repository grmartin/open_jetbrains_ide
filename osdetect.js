module.exports = (function detect_and_load(memCached) {

  // used to spot test in memory cache.
  // if (module.exports.counter === undefined) module.exports.counter = 0;
  // else module.exports.counter++;

  const fs = require('fs'),
    _ = require('lodash'),
    path = require('path');

  const platform = process.platform;
  const isWin = platform.startsWith('win');
  const isDarwin = platform.startsWith('darwin');
  const isMac = isDarwin && fs.existsSync('/System/Library/CoreServices/SystemVersion.plist');
  const isUx = isDarwin || /^(freebsd|linux|sunos)/.test(process.platform);

  const SHOULD_CONTINUE_RECURSION = 'shouldRecurse';
  const FILE_FOUND = 'fileFound';
  const FEED_FILE = '.feed';
  const FEED_FILE_KEYS = ['build', 'id', 'version', 'quality', 'package', 'major_version'];

  let moduleData = {
    isWin, isDarwin, isMac, isUx,
    interop: {
      hasCache: false,
      realizeTilde: function _realizeTilde_ux(filepath) {
        if (filepath[0] === '~') {
          return path.join(process.env.HOME, filepath.slice(1));
        }
        return filepath;
      },
      walker: {
        SHOULD_CONTINUE_RECURSION, FILE_FOUND, FEED_FILE, FEED_FILE_KEYS,
        function: function _walk_dirs(start, subr, contextStore) {

          if (!subr) throw new ReferenceError('The subr parameter must have a value.');

          function __walk(dir, callback) {
            const files = fs.readdirSync(dir);

            files.forEach(function (file) {
              const filepath = path.join(dir, file);
              const stats = fs.statSync(filepath);
              if (stats.isDirectory()) {
                if (callback(SHOULD_CONTINUE_RECURSION, filepath, stats, contextStore)) __walk(filepath, callback);
              } else if (stats.isFile()) {
                callback(FILE_FOUND, filepath, stats, contextStore);
              }

            });
          }

          return __walk(start, subr);
        }
      },
      walkerSubr: function _walkerSubrFunctor() {
        obj = (resultType, filePath, stat, trackingContext) => {
          if (resultType === SHOULD_CONTINUE_RECURSION) {
            return !(trackingContext.baseDir && filePath.startsWith(trackingContext.baseDir));
          } else if (resultType === FILE_FOUND) {
            if (filePath.endsWith(FEED_FILE)) {
              trackingContext.baseDir = path.dirname(filePath);
              trackingContext.apps.push({
                filePath, stat,
                baseDir: trackingContext.baseDir,
                feedData: _.pickBy(JSON.parse(fs.readFileSync(filePath)), (v, k) => true || _.includes(FEED_FILE_KEYS, k))
              });
            }
          }
        };

        obj.apps = [];
        obj.baseDir = null;

        return obj;
      }
      // walkerSubr: function _walk_proc(resultType, filePath, stat) {
      //   console.log("Empty Directory Walker invoked.");
      //   console.trace({resultType, filePath, stat});
      //   return true;
      // }

    }
  };

  //console.trace(moduleData);

  if (isWin) {
    _.assign(moduleData.interop, require('./windows.js'));
  } else if (isMac) {
    _.assign(moduleData.interop, require('./macos.js'));
  } else if (isUx) {
    _.assign(moduleData.interop, require('./linux.js'));
  } else {
    // TODO: THROW
  }

  function addDetonators(moduleData) {
    const booms = ['toolboxAppScanRoot', 'cacheRoot'];
    const len = booms.length;
    for (let i = 0; len > i; i++) {
      const prop = booms[i];
      if (moduleData[prop] === undefined) {
        Object.defineProperty(moduleData, prop, {
          enumerable: true,
          get: function __explode() {
            throw new Error(`The property ${prop} was not set by the OS implementation. Execution Halted.`);
          }
        });
      }
    }
  }

  return (function __() {
    if (moduleData.interop.init) moduleData.interop.init(moduleData.interop);
    // note: we may have post processing later... who knows, leave the option open we can always close it.

    addDetonators(moduleData.interop);

    let exports = moduleData.interop;
    exports.scanResult = moduleData;
    return exports;
  })();
})();