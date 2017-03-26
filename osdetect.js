/**
 * Created by grmartin on 3/25/17.
 */


module.exports = function detect_and_load(memCached){
    if (memCached === undefined) memCached = true;

    if (memCached && module.exports.value) return module.exports.value;

    // used to spot test in memory cache.
    // if (module.exports.counter === undefined) module.exports.counter = 0;
    // else module.exports.counter++;

    const fs = require('fs');
    const _ = require('lodash');

    const platform = process.platform;
    const isWin = platform.startsWith('win');
    const isDarwin = platform.startsWith('darwin');
    const isMac = isDarwin && fs.existsSync('/System/Library/CoreServices/SystemVersion.plist');
    const isUx = isDarwin || /^(freebsd|linux|sunos)/.test(process.platform);

    let moduleData = {
        isWin, isDarwin, isMac, isUx,
        interop: {
            hasCache: false,
            realizeTilde: function _realizeTilde_ux(filepath) {
                if (filepath[0] === '~') {
                    return path.join(process.env.HOME, filepath.slice(1));
                }
                return filepath;
            }
        }
    };

    console.trace(moduleData);

    if (isWin) {
        _.assign(moduleData.interop, require('./windows.js'));
    } else if (isMac) {
        _.assign(moduleData.interop, require('./macos.js'));
    } else if (isUx) {
        _.assign(moduleData.interop, require('./linux.js'));
    } else {
        // TODO: THROW
    }

    return (function __() {
        if (moduleData.interop.init) moduleData.interop.init();
        // note: we may have post processing later... who knows, leave the option open we can always close it.
        return module.exports.value = moduleData;
    })();
};