module.exports = (function open_jetbrains_ide(opts, extra_args) {
  // TODO: SUPPORT LINUX
  // TODO: SUPPORT WINDOWS

  const path = require('path');

  const EXIT_SUCCESS = 0;
  const EXIT_BAD_ARGS = 1;
  const EXIT_APP_NOT_FOUND = 100;

  const ANY_VERSION = '*';

  const optionDefinitions = [
    // the default argument parser puts extra items in the key _unknown. We use that to determine the appname and any
    // other args to be passed and also hijack it for extra_args sent in API mode.

    {name: 'any', alias: 'a', type: Boolean, defaultValue: false, description:"Any version, including EAP (ignores -e and -t)."}, // overrides (skips) EAP and VERSION filters
    {name: 'eap', alias: 'e', type: Boolean, defaultValue: false, description:"Specify that we should allow EAP versions in our result set."},
    {name: 'targetVersion', alias: 't', type: String, defaultValue: ANY_VERSION, description:"Filter for a version match or partial match. Omission or '*' means any."},
    {name: 'scan', alias: 's', type: String, defaultValue: "~/Library/Application Support/JetBrains/Toolbox/apps", description:"The location on disk in which to scan for JetBrains Applications."},
    {name: 'nocache', alias: 'n', type: Boolean, defaultValue: false, description:"Prevent caching of process intensive data, and ignore caches if available."},
    {name: 'jsonOnly', alias: 'j', type: Boolean, defaultValue: false, description:"Suppress output, returning results and output in the form of JSON."},
    {name: 'jsonSimple', type: Boolean, defaultValue: false, description:"Same as -j returning only the result if any."}
  ];

  const usageDefinition = [
    {header: "Arguments:", optionList: optionDefinitions},
    {
      header: "Status Codes:",
      content: [
        {name: 'EXIT_SUCCESS: '+EXIT_SUCCESS, summary: 'The application exited with a successful result.'},
        {name: 'EXIT_BAD_ARGS: '+EXIT_BAD_ARGS, summary: 'Bad arguments were provided to the application.'},
        {name: 'EXIT_APP_NOT_FOUND: '+EXIT_APP_NOT_FOUND, summary: 'The IDE you requested could not be found, or a match with specified parameters could not be made.'}
      ]
    }
  ];

  const apiMode = !!opts;

  function bindLoDash(lo) {
    lo.mixin({
      padArray:function _lodash_padArray(arr, len, val) {
        return lo.assign(lo.fill(new Array(len), val), arr)
      },
      filterAll:function _lodash_filterAll(array, predicate) {
        return lo.filter(array, function (x) {
          const cnt = predicate.length;
          let val = true;
          for (let i = 0; cnt > i; i++) {
            val = val && predicate[i](x);
            if (!val) return false;
          }
          return val;
        });
      }
    });
  }

  function realizeTilde(filepath) {
    if (filepath[0] === '~') {
      return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
  }

  function noop() {}

  function not(fctn) {
    fctn = fctn || noopFunctor(false);
    return function _not(x) {
      return fctn(x);
    }
  }

  function noopFunctor(returnValue) {
    return function _returning_noop() {
      return returnValue;
    }
  }

  function regexVersion(name) {
    const regex = /[A-Za-z]*? ([0-9\.]*).*?\.app/;
    const matches = regex.exec(name);

    if (!matches) return null;
    return matches[1];
  }



  function packageArgs(optionsObject, argumentsArray) {
    optionsObject._unknown = argumentsArray || [];
    return optionsObject;
  }

  let executionCount = 0;

  const SustemModule = new (function SystemAbstraction(){ return {
    find: function __find_stub() {},
    cachePath: function __find_cachePath() {},
    scanProgram: function __scan_program_stub(){}
  };})();

  function _subclass(ctor, fromCtor) {
    ctor.super_ = fromCtor;
    Object.setPrototypeOf(ctor.prototype, fromCtor.prototype);
  }

  return (function _main(_, fs, shell, hasher, package){

    bindLoDash(_);

    const cachePath = realizeTilde("~/Library/Caches/nodepkg_"+package.name);

    shell.mkdir('-p', cachePath);
    let logger = console;

    const options = (function __manipulateResults(parsed){
      parsed.scan = realizeTilde(parsed.scan);
      parsed._unknown = _.map(parsed._unknown||[], realizeTilde);
      parsed.targetVersion = parsed.targetVersion == ANY_VERSION ? null : parsed.targetVersion;
      parsed.jsonOnly = parsed.jsonOnly || apiMode;


      if (parsed.jsonOnly) {

        logger = (function () {
          let data = [];
          const _hr = function _hrTime(){const hrTime = process.hrtime(); return hrTime[0] * 1000000 + hrTime[1] / 1000;};
          return {
            log: (x)=>data.push({level:'log', msg:x, at:this._hr()}),
            info: (x)=>data.push({level:'info', msg:x, at:this._hr()}),
            error: (x)=>data.push({level:'error', msg:x, at:this._hr()}),
            warn: (x)=>data.push({level:'warn', msg:x, at:this._hr()}),
            dir: function (obj) {},
            time: function (label) {},
            timeEnd: function (label) {},
            trace: (x)=>data.push({level:'trace', msg:x, at:this._hr()}),
            assert: function (value, message) {},

            data: ()=>data,

            _original_log: console.log
          }
        })();
      }

      function ___display_help() {
        console.error(require('command-line-usage')(usageDefinition));
        process.exit(EXIT_BAD_ARGS);
      }

      function ___validate_options(parsed) {
        if ((parsed._unknown || []).length < 1) {
          console.error("Error: No application name was supplied.");
          ___display_help();
          process.exit(EXIT_BAD_ARGS);
        }
      }

      function ___eap_filter(x) {
        return x.eap;
      }

      function ___version_filter_functor(version) {
        return function ____version_filter(x) {
          return _.some(x.versions, (x)=>x.startsWith(version));
        }
      }

      function ___name_filter_functor(name) {
        return function ____name_filter(x) {
          return x.name === name.trim().toLowerCase();
        }
      }

      ___validate_options(parsed);

      parsed._custom = {};
      parsed._custom.scanHashed = hasher(parsed.scan);
      parsed._custom.name = parsed._unknown[0];
      parsed._custom.passThruArgs = _.drop(parsed._unknown, 1);

      let filters = [];

      if (!parsed.any) {
        if (parsed.eap) filters.push(parsed.eap ? ___eap_filter : not(___eap_filter));
        if (parsed.targetVersion) filters.push(___version_filter_functor(parsed.targetVersion));
      }
      if (parsed._custom.name) filters.push(___name_filter_functor(parsed._custom.name));

      parsed._custom.filters = filters;

      return parsed;
    })(opts ? packageArgs(opts, extra_args) : require('command-line-args')(optionDefinitions, {partial:true}));

    function longRun(exe, args) {
      require('child_process').spawn(exe, args, {
        detached: true,
        stdio: 'ignore'
      }).unref();
    }

    function execute(command, logger) {
      return shell.exec(command);
    }

    const apps = execute("find \""+options.scan.replace("\"", "\\\"")+"\" -name \"*.app\" | grep -v '/Contents/'", logger).trim().split("\n");

    const longFormVersionOffset = 0;

    function parseInfoPlistKey(rel, abs, key, checkCache) {
      checkCache = (checkCache === null || checkCache === undefined) ? true : checkCache;

      const cacheFilePath = path.join(cachePath, rel.replace(/\//g,'_')+'.'+options._custom.scanHashed+'.json');

      function _parseAndReturn(filePath, onFail) {
        onFail = onFail || noopFunctor(false);

        try{ return JSON.parse(fs.readFileSync(filePath)); }
        catch (e) { return onFail(e, filePath); }
      }

      function _makeCacheFile(then, persistToCache) {
        then = then || noop;

        const cmd = execute("plutil -convert json -o '"+cacheFilePath+"' '"+abs+"/Contents/Info.plist'");
        const returnVal = then(cacheFilePath, cmd);
        if (!persistToCache) {
          fs.unlinkSync(cacheFilePath);
        }
        return returnVal;
      }

      function _buildCacheWhenFails() {
        return _parseAndReturn(_makeCacheFile((filePath, cmd) => _parseAndReturn(filePath, noopFunctor(false)), checkCache));
      }

      let jsonValue = undefined;

      if (fs.existsSync(cacheFilePath) && checkCache) {
        jsonValue = _parseAndReturn(cacheFilePath, _buildCacheWhenFails);
      } else {
        jsonValue = _buildCacheWhenFails();
      }

      if (jsonValue) {
        return jsonValue[key];
      } else {
        return null;
      }
    }

    const appInfo = _.chain(apps)
      .map(function _parse_path_mapper(x) {
        const rel = x.replace(options.scan+'/', '');

        let exe = parseInfoPlistKey(rel, x, 'CFBundleExecutable');

        if (exe) exe = x+'/Contents/MacOS/'+exe;
        if (!exe) exe = x;

        return {
          abs: x,
          exe: exe,
          rel: rel,
          eap: /EAP/.test(rel),
          name: path.basename(rel.toLowerCase(), '.app').split(' ')[0],
          versions: _.chain([
            _.reverse(rel.split('/'))[1],
            regexVersion(rel),
            parseInfoPlistKey(rel, x, 'CFBundleShortVersionString')
          ])
            .filter(function (x) {
              return x;
            }).uniq().value()
        };
      })
      .sort(function _build_number_sort(a,b) {
        const aVer = _.padArray((a.versions[longFormVersionOffset] || "0.0.0.0").split('.'), 4, 0);
        const bVer = _.padArray((b.versions[longFormVersionOffset] || "0.0.0.0").split('.'), 4, 0);

        for (i=0; 4>i; i++) {
          const val = bVer[i] - aVer[i];

          if (val !== 0) return val;
        }
        return 0;
      })
      .value();

    const ch = _.chain(appInfo);

    const foundApp = _.chain(appInfo)
        .filterAll(options._custom.filters)
        .head()
        .value() || null;

    if (!foundApp)
      process.exit(EXIT_APP_NOT_FOUND);

    if (options.jsonOnly) {
      //noinspection RedundantConditionalExpressionJS / RE: readbility
      const jsonOut = _.assign(
        options.jsonSimple ? {} : {
          options: options,
          appInfo: appInfo,
          log: logger.data(),
        },
        {
          resultantApp: foundApp ? {path: foundApp.exe, args:options._custom.passThruArgs, obj:foundApp} : false,
          success: foundApp ? true : false
        }
      );

      if (apiMode) {
        return jsonOut;
      }

      return console.log(JSON.stringify(jsonOut));
    }

    longRun(foundApp.exe, options._custom.passThruArgs);

    process.exit(EXIT_SUCCESS);

  })(require('lodash'), require('fs'), require('shelljs'), (v)=>require('sha.js')('sha256').update(v, 'utf8').digest('hex'), require('./package'));
});

if (require.main === module) {
  module.exports();
}
