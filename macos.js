module.exports = {
  toolboxAppScanRoot: '~/Library/Application Support/JetBrains/Toolbox/apps',
  //cacheRoot: '~/Library/Caches/##NODEPKG##/##HASH##',
  //hasCache: true
  walkerSubr: function _walkerSubrFunctor_macOs(walker) {
    const fs = require('fs'),
      _ = require('lodash'),
      path = require('path');

    obj = (resultType, filePath, stat, trackingContext) => {

      const process = (trackingContext) =>
        trackingContext.baseDir && trackingContext.feedFile && trackingContext.appPath && trackingContext.exeFile &&
        trackingContext.feedFile.startsWith(trackingContext.baseDir) && trackingContext.appPath.startsWith(trackingContext.baseDir) && trackingContext.exeFile.startsWith(trackingContext.appPath);

      const storeIfAble = (trackingContext) => {
        if (process(trackingContext)) {
          trackingContext.apps.push({
            baseDir: trackingContext.baseDir,
            appPath: trackingContext.appPath,
            exeFile: trackingContext.exeFile,
            feedData: _.pickBy(JSON.parse(fs.readFileSync(trackingContext.feedFile)), (v, k) => _.includes(walker.FEED_FILE_KEYS, k))
          });

          trackingContext.feedFile = trackingContext.appPath = trackingContext.exeFile = null;
        }
      };

      if (resultType === walker.SHOULD_CONTINUE_RECURSION) {
        let likelySkip = trackingContext.baseDir && filePath.startsWith(trackingContext.baseDir);
        if (likelySkip) {
          if (/\.app/.test(filePath) && (filePath.endsWith('Contents') || filePath.endsWith('.app') || filePath.endsWith('MacOS'))) {
            if (filePath.endsWith('.app')) {
              trackingContext.appPath = filePath;
            }

            return true;
          }
          return false;
        }
        return true;
      } else if (resultType === walker.FILE_FOUND) {
        if (filePath.endsWith(walker.FEED_FILE)) {
          trackingContext.baseDir = path.dirname(filePath);
          trackingContext.feedFile = filePath;
          storeIfAble(trackingContext);
        } else if (/.app\/Contents\/MacOS\//.test(filePath)) {
          trackingContext.exeFile = filePath;
          storeIfAble(trackingContext);
        }
      }
    };

    obj.apps = [];
    obj.baseDir = null;

    return obj;
  }

};
