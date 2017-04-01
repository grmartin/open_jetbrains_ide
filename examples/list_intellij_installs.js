const oji = require('../run'); // From the invoker's perspective this is 'open_jetbrains_ide'.

console.log(JSON.stringify({
  'Looking for any version of IntelliJ':
      oji({any: true}, 'idea'),
  'Looking for an EAP (or RC) version of IntelliJ':
      oji({eap: true}, 'idea'),
  'Looking for a 2017 version of IntelliJ':
      oji({targetVersion: 2017}, 'idea'),
  'Looking for the community version of IntelliJ':
      oji('idea-c')
}, 6));

/***
 EXAMPLE OUTPUT
 
 ```JSON
 {
  "Looking for any version of IntelliJ": {
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
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/171.3890.9",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "171.3890.9",
          "2017.1"
        ]
      },
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
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/171.3780.115",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "171.3780.115",
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
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/171.3780.106",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "171.3780.106",
          "EAP 7"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104/PhpStorm 2017.1 EAP.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/171.3780.104",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "171.3780.104",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/171.3780.102",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "171.3780.102",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96/RubyMine.app/Contents/MacOS/rubymine",
        "rel": "RubyMine/ch-0/171.3780.96",
        "eap": false,
        "productName": "rubymine",
        "idName": "rubymine",
        "idNameNS": "rubymine",
        "append": 9000,
        "versions": [
          "171.3780.96",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/171.3780.79",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "171.3780.79",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3655.1246",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3655.1246",
          "EAP 19"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3085.726",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3085.726",
          "EAP 18"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10/CLion.app/Contents/MacOS/clion",
        "rel": "CLion/ch-0/163.15188.10",
        "eap": false,
        "productName": "clion",
        "idName": "clion",
        "idNameNS": "clion",
        "append": 9000,
        "versions": [
          "163.15188.10",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/163.15188.8",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "163.15188.8",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/163.15188.4",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "163.15188.4",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/163.13906.24",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "163.13906.24",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21/PhpStorm.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/163.13906.21",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "163.13906.21",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/163.13906.18",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "163.13906.18",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/163.13906.13",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "163.13906.13",
          "2016.3.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/163.12024.32",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "163.12024.32",
          "EAP 6"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2317",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2317",
          "3.4.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2189",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2189",
          "3.4.3"
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
  },
  "Looking for an EAP (or RC) version of IntelliJ": {
    "options": {
      "any": false,
      "eap": true,
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
          null,
          null
        ]
      }
    },
    "appInfo": [
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/171.3890.9",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "171.3890.9",
          "2017.1"
        ]
      },
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
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/171.3780.115",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "171.3780.115",
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
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/171.3780.106",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "171.3780.106",
          "EAP 7"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104/PhpStorm 2017.1 EAP.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/171.3780.104",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "171.3780.104",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/171.3780.102",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "171.3780.102",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96/RubyMine.app/Contents/MacOS/rubymine",
        "rel": "RubyMine/ch-0/171.3780.96",
        "eap": false,
        "productName": "rubymine",
        "idName": "rubymine",
        "idNameNS": "rubymine",
        "append": 9000,
        "versions": [
          "171.3780.96",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/171.3780.79",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "171.3780.79",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3655.1246",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3655.1246",
          "EAP 19"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3085.726",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3085.726",
          "EAP 18"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10/CLion.app/Contents/MacOS/clion",
        "rel": "CLion/ch-0/163.15188.10",
        "eap": false,
        "productName": "clion",
        "idName": "clion",
        "idNameNS": "clion",
        "append": 9000,
        "versions": [
          "163.15188.10",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/163.15188.8",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "163.15188.8",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/163.15188.4",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "163.15188.4",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/163.13906.24",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "163.13906.24",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21/PhpStorm.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/163.13906.21",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "163.13906.21",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/163.13906.18",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "163.13906.18",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/163.13906.13",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "163.13906.13",
          "2016.3.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/163.12024.32",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "163.12024.32",
          "EAP 6"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2317",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2317",
          "3.4.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2189",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2189",
          "3.4.3"
        ]
      }
    ],
    "resultantApp": false,
    "success": false
  },
  "Looking for a 2017 version of IntelliJ": {
    "options": {
      "any": false,
      "eap": false,
      "targetVersion": 2017,
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
          null,
          null
        ]
      }
    },
    "appInfo": [
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/171.3890.9",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "171.3890.9",
          "2017.1"
        ]
      },
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
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/171.3780.115",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "171.3780.115",
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
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/171.3780.106",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "171.3780.106",
          "EAP 7"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104/PhpStorm 2017.1 EAP.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/171.3780.104",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "171.3780.104",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/171.3780.102",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "171.3780.102",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96/RubyMine.app/Contents/MacOS/rubymine",
        "rel": "RubyMine/ch-0/171.3780.96",
        "eap": false,
        "productName": "rubymine",
        "idName": "rubymine",
        "idNameNS": "rubymine",
        "append": 9000,
        "versions": [
          "171.3780.96",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/171.3780.79",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "171.3780.79",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3655.1246",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3655.1246",
          "EAP 19"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3085.726",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3085.726",
          "EAP 18"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10/CLion.app/Contents/MacOS/clion",
        "rel": "CLion/ch-0/163.15188.10",
        "eap": false,
        "productName": "clion",
        "idName": "clion",
        "idNameNS": "clion",
        "append": 9000,
        "versions": [
          "163.15188.10",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/163.15188.8",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "163.15188.8",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/163.15188.4",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "163.15188.4",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/163.13906.24",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "163.13906.24",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21/PhpStorm.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/163.13906.21",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "163.13906.21",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/163.13906.18",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "163.13906.18",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/163.13906.13",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "163.13906.13",
          "2016.3.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/163.12024.32",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "163.12024.32",
          "EAP 6"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2317",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2317",
          "3.4.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2189",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2189",
          "3.4.3"
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
  },
  "Looking for the community version of IntelliJ": {
    "options": {
      "any": false,
      "eap": false,
      "targetVersion": "::default",
      "scan": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps",
      "jsonOnly": true,
      "jsonSimple": false,
      "_unknown": [
        "idea-c"
      ],
      "_custom": {
        "scanHashed": "ea79288b062bf819d5db0f4c47f2314eefb171dd02627f393de69530c9bb115d",
        "name": "idea-c",
        "passThruArgs": [
          
        ],
        "filters": [
          null
        ]
      }
    },
    "appInfo": [
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/171.3890.9/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/171.3890.9",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "171.3890.9",
          "2017.1"
        ]
      },
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
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/171.3780.115/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/171.3780.115",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "171.3780.115",
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
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/171.3780.106/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/171.3780.106",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "171.3780.106",
          "EAP 7"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/171.3780.104/PhpStorm 2017.1 EAP.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/171.3780.104",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "171.3780.104",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/171.3780.102/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/171.3780.102",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "171.3780.102",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/RubyMine/ch-0/171.3780.96/RubyMine.app/Contents/MacOS/rubymine",
        "rel": "RubyMine/ch-0/171.3780.96",
        "eap": false,
        "productName": "rubymine",
        "idName": "rubymine",
        "idNameNS": "rubymine",
        "append": 9000,
        "versions": [
          "171.3780.96",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/171.3780.79/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/171.3780.79",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "171.3780.79",
          "2017.1"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3655.1246/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3655.1246",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3655.1246",
          "EAP 19"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Rider/ch-0/171.3085.726/Rider EAP.app/Contents/MacOS/rider",
        "rel": "Rider/ch-0/171.3085.726",
        "eap": true,
        "productName": "rider",
        "idName": "rider",
        "idNameNS": "rider",
        "append": 1000,
        "versions": [
          "171.3085.726",
          "EAP 18"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/CLion/ch-0/163.15188.10/CLion.app/Contents/MacOS/clion",
        "rel": "CLion/ch-0/163.15188.10",
        "eap": false,
        "productName": "clion",
        "idName": "clion",
        "idNameNS": "clion",
        "append": 9000,
        "versions": [
          "163.15188.10",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/WebStorm/ch-0/163.15188.8/WebStorm.app/Contents/MacOS/webstorm",
        "rel": "WebStorm/ch-0/163.15188.8",
        "eap": false,
        "productName": "webstorm",
        "idName": "webstorm",
        "idNameNS": "webstorm",
        "append": 9000,
        "versions": [
          "163.15188.8",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PyCharm-P/ch-0/163.15188.4/PyCharm.app/Contents/MacOS/pycharm",
        "rel": "PyCharm-P/ch-0/163.15188.4",
        "eap": false,
        "productName": "pycharm-p",
        "idName": "pycharm-p",
        "idNameNS": "pycharm",
        "append": 9000,
        "versions": [
          "163.15188.4",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/AppCode/ch-0/163.13906.24/AppCode.app/Contents/MacOS/appcode",
        "rel": "AppCode/ch-0/163.13906.24",
        "eap": false,
        "productName": "appcode",
        "idName": "appcode",
        "idNameNS": "appcode",
        "append": 9000,
        "versions": [
          "163.13906.24",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/PhpStorm/ch-0/163.13906.21/PhpStorm.app/Contents/MacOS/phpstorm",
        "rel": "PhpStorm/ch-0/163.13906.21",
        "eap": false,
        "productName": "phpstorm",
        "idName": "phpstorm",
        "idNameNS": "phpstorm",
        "append": 9000,
        "versions": [
          "163.13906.21",
          "2016.3.3"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/IDEA-U/ch-0/163.13906.18/IntelliJ IDEA.app/Contents/MacOS/idea",
        "rel": "IDEA-U/ch-0/163.13906.18",
        "eap": false,
        "productName": "idea-u",
        "idName": "idea-u",
        "idNameNS": "idea",
        "append": 9000,
        "versions": [
          "163.13906.18",
          "2016.3.5"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/datagrip/ch-0/163.13906.13/DataGrip.app/Contents/MacOS/datagrip",
        "rel": "datagrip/ch-0/163.13906.13",
        "eap": false,
        "productName": "datagrip",
        "idName": "datagrip",
        "idNameNS": "datagrip",
        "append": 9000,
        "versions": [
          "163.13906.13",
          "2016.3.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/Gogland/ch-0/163.12024.32/Gogland 1.0 EAP.app/Contents/MacOS/gogland",
        "rel": "Gogland/ch-0/163.12024.32",
        "eap": true,
        "productName": "gogland",
        "idName": "gogland",
        "idNameNS": "gogland",
        "append": 1000,
        "versions": [
          "163.12024.32",
          "EAP 6"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2317/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2317",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2317",
          "3.4.4"
        ]
      },
      {
        "abs": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189",
        "exe": "/Users/someuser/Library/Application Support/JetBrains/Toolbox/apps/MPS/ch-0/162.2189/MPS 3.4.app/Contents/MacOS/idea_appLauncher",
        "rel": "MPS/ch-0/162.2189",
        "eap": false,
        "productName": "mps",
        "idName": "mps",
        "idNameNS": "mps",
        "append": 9000,
        "versions": [
          "162.2189",
          "3.4.3"
        ]
      }
    ],
    "resultantApp": false,
    "success": false
  }
}
 ```
 */
