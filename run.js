module.exports = (function open_jetbrains_ide(opts, extra_args) {
  const path = require('path');
  const opsys = require('./osdetect');

  /* External Constants */
  const EXIT_SUCCESS = 0;
  const EXIT_BAD_ARGS = 1;
  const EXIT_APP_NOT_FOUND = 100;

  const ENV_SCAN_DIR = 'OJI_SCRIPT_SCAN_DIR';
  const ENV_CACHE_DIR = 'OJI_SCRIPT_CACHE_DIR';

  /* Internal Constants */
  const ANY_VERSION = '*';

  const DEFAULT_VALUE = "::default";

  const STABLE_APPEND = 9000;
  const RC_APPEND = 3000;
  const EAP_APPEND = 1000;

  // Standard 4 + Additional that we tack on to aide sorting by appended edition value.
  const ALLBALLS_VERSION = '0.0.0.0.0';
  const BALL_COUNT = ALLBALLS_VERSION.split(0).length;

  const optionDefinitions = [
    // the default argument parser puts extra items in the key _unknown. We use that to determine the appname and any
    // other args to be passed and also hijack it for extra_args sent in API mode.

    {
      name: 'any',
      alias: 'a',
      type: Boolean,
      defaultValue: false,
      description: "Any version, including EAP (ignores -e and -t)."
    }, // overrides (skips) EAP and VERSION filters
    {
      name: 'eap',
      alias: 'e',
      type: Boolean,
      defaultValue: false,
      description: "Specify that we should allow EAP versions in our result set."
    },
    {
      name: 'targetVersion',
      alias: 't',
      type: String,
      defaultValue: DEFAULT_VALUE,
      description: "Filter for a version match or partial match. Omission or '*' means any."
    },
    {
      name: 'scan',
      alias: 's',
      type: String,
      defaultValue: DEFAULT_VALUE,
      description: "The location on disk in which to scan for JetBrains Applications."
    },
    /*{
      name: 'nocache',
      alias: 'n',
      type: Boolean,
      defaultValue: false,
      description: "Prevent caching of process intensive data, and ignore caches if available."
    },*/
    {
      name: 'jsonOnly',
      alias: 'j',
      type: Boolean,
      defaultValue: false,
      description: "Suppress output, returning results and output in the form of JSON."
    },
    {
      name: 'jsonSimple',
      type: Boolean,
      defaultValue: false,
      description: "Same as -j returning only the result if any."
    }
  ];

  const usageDefinition = [
    {header: "Arguments:", optionList: optionDefinitions},
    {
      header: "Environment Variables:",
      content: [
        {
          name: null,
          summary: "Environment variables only change the defaults, their values can still be modified at invocation via switches."
        },
        {name: ENV_SCAN_DIR, summary: 'Directory to scan for applications.'},
        //{name: ENV_CACHE_DIR, summary: 'Default caching directory.'}
      ]
    },
    {
      header: "Status Codes:",
      content: [
        {name: 'EXIT_SUCCESS: ' + EXIT_SUCCESS, summary: 'The application exited with a successful result.'},
        {name: 'EXIT_BAD_ARGS: ' + EXIT_BAD_ARGS, summary: 'Bad arguments were provided to the application.'},
        {
          name: 'EXIT_APP_NOT_FOUND: ' + EXIT_APP_NOT_FOUND,
          summary: 'The IDE you requested could not be found, or a match with specified parameters could not be made.'
        }
      ]
    }
  ];

  const apiMode = !!opts;

  function bindLoDash(lo) {
    function escapeRegexp(str) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegexp(find), 'g'), replace);
    }

    lo.mixin({
      replaceAll, // NO REGEXP
      escapeRegexp,

      padArray: function _lodash_padArray(arr, len, val) {
        return lo.assign(lo.fill(new Array(len), val), arr)
      },
      filterAll: function _lodash_filterAll(array, predicate) {
        return lo.filter(array, function (x) {
          const cnt = predicate.length;
          let val = true;
          for (let i = 0; cnt > i; i++) {
            val = val && predicate[i](x);
            if (!val) return false;
          }
          return val;
        });
      },
      kvpReplace: function _lodash_kvpReplace(str, kvp) {
        let output = str;
        for (let key in kvp) {
          output = replaceAll(output, `##${key}##`, kvp[key]);
        }
        return output;
      }
    });
  }

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

  function packageArgs(optionsObject, argumentsArray) {
    optionsObject._unknown = argumentsArray || [];
    return optionsObject;
  }

  let executionCount = 0;

  return (function _main(_, fs, shell, hasher, package) {

    bindLoDash(_);

    let logger = console;

    const options = (function __manipulateResults(parsed) {

      parsed.scan = opsys.realizeTilde(parsed.scan === DEFAULT_VALUE ? opsys.toolboxAppScanRoot : parsed.scan);
      parsed._unknown = _.map(parsed._unknown || [], opsys.realizeTilde);
      parsed.targetVersion = parsed.targetVersion === ANY_VERSION ? null : parsed.targetVersion;
      parsed.jsonOnly = parsed.jsonOnly || parsed.jsonSimple || apiMode;


      if (parsed.jsonOnly) {

        logger = (function () {
          let data = [];
          const _hr = function _hrTime() {
            const hrTime = process.hrtime();
            return hrTime[0] * 1000000 + hrTime[1] / 1000;
          };
          return {
            log: (x) => data.push({level: 'log', msg: x, at: this._hr()}),
            info: (x) => data.push({level: 'info', msg: x, at: this._hr()}),
            error: (x) => data.push({level: 'error', msg: x, at: this._hr()}),
            warn: (x) => data.push({level: 'warn', msg: x, at: this._hr()}),
            dir: (obj)=>{},
            time: (label)=>{},
            timeEnd: (label)=>{},
            trace: (x) => data.push({level: 'trace', msg: x, at: this._hr()}),
            assert: ()=>{},

            data: () => data,

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
          return _.some(x.versions, (x) => x.startsWith(version));
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
        if (parsed.targetVersion && parsed.targetVersion !== DEFAULT_VALUE) filters.push(___version_filter_functor(parsed.targetVersion));
      }
      if (parsed._custom.name) filters.push(___name_filter_functor(parsed._custom.name));

      parsed._custom.filters = filters;

      return parsed;
    })(opts ? packageArgs(opts, extra_args) : require('command-line-args')(optionDefinitions, {partial: true}));

    function longRun(exe, args) {
      require('child_process').spawn(exe, args, {
        detached: true,
        stdio: 'ignore'
      }).unref();
    }

    let subCtx = opsys.walkerSubr();

    opsys.walker.function(options.scan, subCtx, subCtx);

    const apps = subCtx.apps;
    const LONG_FORM_VERSION_OFFSET = 0;

    const appInfo = _.chain(apps)
      .map(function _parse_path_mapper(obj) {
        const x = obj.baseDir;
        const rel = x.replace(options.scan + '/', '');

        const edition = / RC[0-9]*?$/.test(obj.feedData.version) ?
          RC_APPEND : /EAP/.test(obj.feedData.quality.name) ?
            EAP_APPEND : STABLE_APPEND;

        return {
          abs: x,
          exe: path.join(x, obj.feedData.package.command),
          rel: rel,
          eap: edition !== STABLE_APPEND,
          name: obj.feedData.id.toLowerCase(),
          append: edition,
          versions: _.chain([
            obj.feedData.build,
            obj.feedData.name
          ])
            .compact()
            .uniq()
            .value()
        };
      })
      .sort(function _build_number_sort(a, b) {
        const aVer = _.padArray((a.versions[LONG_FORM_VERSION_OFFSET] || ALLBALLS_VERSION).split('.'), BALL_COUNT, 0);
        const bVer = _.padArray((b.versions[LONG_FORM_VERSION_OFFSET] || ALLBALLS_VERSION).split('.'), BALL_COUNT, 0);

        aVer[4] = a.append;
        bVer[4] = b.append;

        for (i = 0; BALL_COUNT > i; i++) {
          const val = bVer[i] - aVer[i];

          if (val !== 0) return val;
        }
        return 0;
      })
      .value();

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
          resultantApp: foundApp ? {path: foundApp.exe, args: options._custom.passThruArgs, obj: foundApp} : false,
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

  })(require('lodash'), require('fs'), require('shelljs'), (v) => require('sha.js')('sha256').update(v, 'utf8').digest('hex'), require('./package'));
});

if (require.main === module) {
  module.exports();
}
