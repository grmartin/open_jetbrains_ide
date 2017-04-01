# open_jetbrains_ide

This project started out as a way to launch a JetBrains IDE (installed via their Toolbox application) via the command line. JetBrains has its own Command Line launcher script, however it binds to the account of the user who installed it, and when an IDE is upgraded the script simply stops working as it is not pointing to an invalid path.

## Command Line Options:
### Arguments:

- `-a`, `--any`                    Any release quality. EAP or Release.
- `-e`, `--eap`                    Specify that we should allow EAP versions in our result set, by default only formal releases are returned..
- `-t`, `--targetVersion string`   Filter for a version match or partial match. Omission or '*' means any.
- `-s`, `--scan string`            The location on disk in which to scan for JetBrains Applications.
- `-j`, `--jsonOnly`               Suppress output, returning results and output in the form of JSON.
- `--jsonSimple`                   Same as `-j` returning only the result if any.

### Environment Variables:

Environment variables only change the defaults, their values can still be modified at invocation via switches.

- `OJI_SCRIPT_SCAN_DIR`   Directory to scan for applications.

### Status Codes:

- `EXIT_SUCCESS`: `0`,           The application exited with a successful result.
- `EXIT_BAD_ARGS`: `1`,          Bad arguments were provided to the application.
- `EXIT_APP_NOT_FOUND`: `100`,   The IDE you requested could not be found, or a match with specified parameters could not be made.

## API

This application is implemented as a single function API call exported directly by the module. API calls will NOT spawn the IDE, however the `resultantApp` property of the return object offers the `path` and `args` to invoke spawn yourself. The third key provided (`obj`) includes all of the scanned information of the application that best matches your inquiry.

```js
const oji = require('open_jetbrains_ide');

// 'idea' will return the first IntelliJ entry it finds, 'idea-u' the first of the professional edition, and 'idea-c' that of the community edition.
console.log(oji('idea')); 

/*
{
    "options": {
      "any": true,
      "eap": false,
      "targetVersion": "::default",
      "scan": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps",
      "jsonOnly": true,
      "jsonSimple": false,
      "_unknown": [
        "idea"
      ],
      "_custom": {
        "scanHashed": "ea79288b062bf819d5db0f4c47f2314eefb171dd02627f393de69530c9bb115d",
        "name": "idea",
        "passThruArgs": [
          
        ],
        "filters": [
          null
        ]
      }
    },
    "appInfo": [
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/171.3780.121",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/171.3780.121/CLion.app/Contents/MacOS/clion",
        "rel": "CLion/ch-0/171.3780.121",
        "eap": false,
        "productName": "clion",
        "idName": "clion",
        "idNameNS": "clion",
        "append": 9000,
        "versions": [
          "171.3780.121",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/171.3780.107",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/171.3780.107/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/171.3780.107",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "171.3780.107",
          "2017.1"
        ]
      }
    ],
    "resultantApp": {
      "path": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/171.3780.107/IntelliJ IDEA.app/Contents/MacOS/idea",
      "args": [
        
      ],
      "obj": {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/171.3780.107",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/171.3780.107/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/171.3780.107",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "171.3780.107",
          "2017.1"
        ]
      }
    },
    "success": true
  }
 */
```

### oji([ options ], args)

If the first argument is a string, or an array, it is treated first as if the options argument is an empty object and only arguments were passed in.

The first argument should always be the name, common alias or name partial of the IDE to be invoked. Normally all other arguments would be passed directly to the IDE.

The return of this function when called via the API is always a JavaScript Object.

#### options

Options correspond to the long form name of the parameters as found within the CLI app in the form of long switches. However they break down in to three categories.

- Environmental
    - `scan` : STRING. The base path at which to start our scan for a toolbox managed set of JetBrains IDEs. This matches the environment variable `OJI_SCRIPT_SCAN_DIR`. In every case if provided the environment variable is treated as the default value, thus a provided switch will override that value for a single run.
- Filtering
    - `eap` : BOOLEAN, Default: FALSE. Instructs the scanner to return only EAP quality applications. This includes formal Release Candidates. By default the scanner will only return formal releases.
    - `targetVersion` : STRING. Target a certain version, or version partial. This can match either the internal JetBrains build number or the published version. Partials -will- match. A value of `2017` can match `2017`, `2017.0`, `2017.0.1` etc.
    - `any` : BOOLEAN, Default: FALSE. This ignore both the EAP filter (returning either EAP or Release) and the targetVersion
- Output
    - `jsonOnly` : BOOLEAN, Default: FALSE (CLI) or TRUE (API). Returns a JSON style output if invoked on the command line or a JavaScript object when used via the API. The format of these objects is identical. The return object includes the standard `resultantApp` and `success` properties as well as `options` which includes what was sent to the script when it was invoked and the logic behind which we parsed our arguments.
    - `jsonSimple` : BOOLEAN, Default: FALSE. This switch implies `jsonOnly` and passes back the same object, except with only the `resultantApp` and `success` properties.

### Examples

More usage examples for both the commandline (*nix) and of the API call can be found in the [examples](https://github.com/grmartin/open_jetbrains_ide/tree/master/examples) folder.
