#!/usr/bin/env node

const isCli = () => require.main === module || !module.parent;

module.exports = (function open_jetbrains_ide(opts, extra_args) {
  const apiMode = !!opts || !isCli();
  const _ = require('lodash');
  const fs = require('fs');
  const path = require('path');

  /* External Constants */
  const EXIT_SUCCESS = 0;
  const EXIT_BAD_ARGS = 1;
  const EXIT_APP_NOT_FOUND = 100;

  const ENV_SCAN_DIR = 'OJI_SCRIPT_SCAN_DIR';
  const ENV_CLEAN_CWD = 'OJI_SCRIPT_CLEAN_CWD';
  const ENV_LIT_ARGS = 'OJI_SCRIPT_LITERAL_ARGS';

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
      description: "Any release quality. EAP or Release."
    },
    {
      name: 'eap',
      alias: 'e',
      type: Boolean,
      defaultValue: false,
      description: "Specify that we should allow EAP versions in our result set, by default only formal releases are returned."
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
        {name: ENV_CLEAN_CWD, summary: 'Set to truth-y to leave CWD undefined in the launched process. Otherwise the new program will take on the CWD of the executor.'},
        {name: ENV_LIT_ARGS, summary: 'Treat additional arguments as literal. (Do not try to match up with the CWD.)'}
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

  const productNameAliases = [
    // The real value must be in the array of aliases for that program for the filtering process to work.
    // JB ProdCode ShortHand. All IntelliJ product does are:  ("CL", "DB", "GO", "IC", "IU", "MPS", "OC", "PC", "PE", "PS", "PY", "RM", "RS", "WS")
    ['idea', 'intellij', 'ic', 'iu'], // -u vs -c is part of the productName and or idName... Not neede in aliases... and can call the wrong IDE if you have both.,
    ['rubymine', 'mine', 'rubydev', 'rm'],
    ['pycharm', 'charm', 'pyh', 'py', 'pe', 'pc'],
    ['webstorm', 'wstorm', 'wi', 'ws'],
    ['phpstorm', 'pstorm', 'ps'],
    ['datagrip', 'dbe', 'db'],
    ['appcode', 'objc', 'oc'],
    ['gogland', 'go'],
    ['clion', 'cl']
  ];

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
      return !fctn(x);
    }
  }

  function noopFunctor(returnValue) {
    return function _returning_noop() {
      return returnValue;
    }
  }

  function packageArgs(optionsObject, argumentsArray) {
    optionsObject._unknown = argumentsArray ?
      _.isString(argumentsArray) ?
        [argumentsArray] : argumentsArray
      : [];
    return optionsObject;
  }

  function truthy(value) {
    if (!value) return false;
    if (value === 0) return false;
    value = value.toLowerCase().trim();
    if (!value) return false;
    if (value === '0' || value === 'no'|| value === 'off'|| value === 'false'|| value === 'n'|| value === 'f') return false;
    return true;
  }

  function pathify(x) {
    const examine = path.join(process.cwd(), x);
    if (fs.existsSync(examine)) {
      return examine;
    }
    return x;
  }

  if (apiMode) {
    if (arguments.length === 1 && (_.isArray(arguments[0]) || _.isString(arguments[0]))) {
      extra_args = arguments[0];
      opts = {};
    }

    opts = _.assign(
      function _defaulter() {
        let out = {};
        _.forEach(optionDefinitions, function (value, idx) {
          if (value.defaultValue !== undefined) {
            out[value.name] = value.defaultValue;
          }
        });
        return out;
      }(),
      opts
    );
  }

  return (function _main(hasher, opsys) {
    bindLoDash(_);

    let logger = console;

    const options = (function __manipulateResults(parsed) {

      parsed.scan = opsys.realizeTilde((parsed.scan||DEFAULT_VALUE) === DEFAULT_VALUE ?
        process.env[ENV_SCAN_DIR] ?
          process.env[ENV_SCAN_DIR] :  opsys.toolboxAppScanRoot : parsed.scan);
      parsed._unknown = _.map(parsed._unknown || [], opsys.realizeTilde);
      parsed.targetVersion = parsed.targetVersion === ANY_VERSION ? null : parsed.targetVersion;
      parsed.jsonOnly = parsed.jsonOnly || parsed.jsonSimple || apiMode;

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
        // 1. Try a direct match across our name fields
        // 2. Try known aliases (if any)
        // 3. Try partial matches if able. (assuming the string specified is 4 or more characters.)

        const cleanName = name.trim().toLowerCase();

        const aliasSet = _.first(_.filter(productNameAliases, (x) => _.some(x, (xs) => xs === cleanName)));

        const partialMatcher = cleanName.length <= 3 ? {test:noopFunctor(false)} : new RegExp(_.escapeRegexp(cleanName), 'i');

        const exactMatcher = (x, v) => x.idName === v || x.idNameNS === v || x.name === v;

        return function ____name_filter(x) {
          if (exactMatcher(x, cleanName)) return true;

          if (aliasSet) {
            const cnt = aliasSet.length;
            for (let i = 0; cnt > i; i++) {
              if (exactMatcher(x, aliasSet[i])) return true;
            }
          }

          return (partialMatcher.test(x.name) || partialMatcher.test(x.idName) || partialMatcher.test(x.idNameNS));
        }
      }

      ___validate_options(parsed);

      parsed._custom = {};
      parsed._custom.scanHashed = hasher(parsed.scan);
      parsed._custom.name = parsed._unknown[0];
      parsed._custom.passThruArgs = _.map(_.drop(parsed._unknown, 1), truthy(process.env[ENV_LIT_ARGS]) ? (x)=>x : pathify);

      let filters = [];

      if (!parsed.any) {
        filters.push(parsed.eap ? ___eap_filter : not(___eap_filter));
      }

      if (parsed.targetVersion && parsed.targetVersion !== DEFAULT_VALUE) filters.push(___version_filter_functor(parsed.targetVersion));
      if (parsed._custom.name) filters.push(___name_filter_functor(parsed._custom.name));

      parsed._custom.filters = filters;

      return parsed;
    })(opts ? packageArgs(opts, extra_args) : require('command-line-args')(optionDefinitions, {partial: true}));


    function longRun(exe, args) {
      require('child_process').spawn(exe, args, {
        detached: true,
        stdio: 'ignore',
        cwd: truthy(process.env[ENV_CLEAN_CWD]) ? undefined : process.cwd()
      }).unref();
    }

    let subCtx = opsys.walkerSubr(opsys.walker);

    opsys.walker.function(options.scan, subCtx, subCtx);

    const apps = subCtx.apps;
    const LONG_FORM_VERSION_OFFSET = 0;

    const appInfo = _.chain(apps) // id startsWith ReSharper
      .filter(function _unsupported_apps(app) {
        return !app.feedData.id.startsWith('ReSharper');
      })
      .map(function _parse_path_mapper(obj) {
        const x = obj.baseDir;
        const rel = x.replace(options.scan + '/', '');

        const edition = / RC[0-9]*?$/.test(obj.feedData.version) ?
          RC_APPEND : /EAP/.test(obj.feedData.quality.name) ?
            EAP_APPEND : STABLE_APPEND;

        return {
          abs: x,
          exe: obj.exeFile ? obj.exeFile : path.join(x, obj.feedData.package.command),
          rel: rel,
          eap: edition !== STABLE_APPEND,
          productName: obj.feedData.id.toLowerCase(),
          idName: obj.feedData.id.toLowerCase(),
          idNameNS: _.first(obj.feedData.id.toLowerCase().split('-')),
          append: edition,
          versions: _.chain([
            obj.feedData.build,
            obj.feedData.version
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


    if (options.jsonOnly) {
      // TODO: Don't return 'filters' in JSON return or Output Modes.
      //noinspection RedundantConditionalExpressionJS / RE: readbility
      const jsonOut = _.assign(
        options.jsonSimple ? {} : {
          options: options,
          appInfo: appInfo
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

    if (!foundApp)
      return process.exit(EXIT_APP_NOT_FOUND);

    longRun(foundApp.exe, options._custom.passThruArgs);

    process.exit(EXIT_SUCCESS);

  })((v) => require('sha.js')('sha256').update(v, 'utf8').digest('hex'), require('./osdetect/osdetect'));
});

if (isCli()) {
  module.exports();
}
