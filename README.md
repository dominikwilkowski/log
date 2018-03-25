LOG
===

> Better logging for your node app


## Contents

* [Install](#install)
* [Use](#use)
* [Customize](#customize)
* [Settings](#settings)
* [Tests](#tests)
* [Release History](#release-history)
* [License](#license)


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Install


```shell
TODO
```


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Use

Run the logger via:

```js
const Log = require('TODO');

Log.banner( 'My app started' );
Log.info( 'Server running at #', IPandPort );
```


### Vocabulary

You got a bunch of logs to chose from:

```shell
 📣           Banner log

 👍           Ok log

 🔥  ERROR:   Error log

 🔔  INFO:    Info log

 🚀  DONE     Done log

 😬  VERBOSE: Verbose log

 🕐  [Sat Mar 24 2018 23:13:19 GMT+1100 (AEDT)]
Time log
```


### Variables

You can add variables by adding them as arguments. Each placeholder `#` will be replaced one by one with those variables. If you don’t have enough placeholder
the variables will be appended at the end:

```js
Log.info( 'running function in folder # to find #', 'folder', 'needle' );
//  🔔  INFO:  running function in folder "folder" to find "needle"

Log.info( 'running function in folder # to find #', 'folder' );
//  🔔  INFO:  running function in folder "folder" to find #

Log.info( 'running function in folder # to find #', 'folder', 'needle', 42, [ 'one', 'two' ] );
//  🔔  INFO:  running function in folder "folder" to find "needle" 42,["one","two"]
```

All variables are colored yellow to make reading easier.


### Indentation

Logs that run over the space you have in your terminal will automatically indent on the next line:

```
🔔  INFO: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do "var!"
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation.
```

This can be disabled in the [`disableIndent`](#disableindent) setting.


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Customize

You can extend the vocabulary of the log yourself by adding a flag and wrapping the `Log.Output` function:

```js
Log.flags.monkey = ' 🐒  monkey business: ';

Log.monkey = ( text, ...vars ) => console.log( Log.Style.magenta( Log.Output( 'monkey', text, vars ) ) ),

Log.banner('Monkey business starting now!');
Log.monkey('Hey hey!!!');
 // 📣                   Monkey business starting now!
 // 🐒  monkey business: Hey hey!!!
```

Registering a new flag will now ensure all other flags are indented to the largest flag unless it is disabled via the [`disableIndent`](#disableindent) setting.


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Settings

You can change the default settings via:

```js
Log.pretty = true;
```

An example would be:

```js
const Log = require('TODO');

if( process.argv.includes('-v') || process.argv.includes('--verbose') ) {
	Log.verboseMode = true;
}
```


### `verboseMode`
_(boolean)_  
default: `false`

Toggle verbose output.


### `verboseFilter`
_(string)_  
default: ``

You can filter the verbose output with this regex string. If you want to show only messages with the word `foo` then you’d use:

```js
Log.verboseFilter = 'foo';
```

If you want to filter all messages that begin with `bar` you’d use:

```js
Log.verboseFilter = '^bar';
```


### `disableIndent`
_(array)_  
default: `[ 'time' ]`

All messages are indented by the largest flag of all types. You can disable a particular type if that type has a very large flag that would make indentation
of all other look ridicules. Below is what it looks like by default because the type `time` has it's indent disabled.

```
 📣           Banner log
 👍           Ok log
 🔥  ERROR:   Error log
 🔔  INFO:    Info log
 🚀  DONE     Done log
 😬  VERBOSE: Verbose log
 🕐  [Sat Mar 24 2018 23:13:19 GMT+1100 (AEDT)]
time
```

This is what it would look like if you enabled all indentation and included `time`:

```
 📣                                             Banner log
 👍                                             Ok log
 🔥  ERROR:                                     Error log
 🔔  INFO:                                      Info log
 🚀  DONE                                       Done log
 😬  VERBOSE:                                   Verbose log
 🕐  [Sun Mar 25 2018 11:33:18 GMT+1100 (AEDT)] Time log
```

Enabled:
```
🔔  INFO: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do "var!"
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation.
```

Disabled:
```
🔔  INFO:
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do "var!" eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation.
```

### `pretty`
_(boolean)_  
default: `false`

Enable pretty printing of variables.

Enabled:
```
🔥  ERROR: The cause:
           {"thing":"because","more":{"evenmore":[{"reason":"buffer"}]}}
```

Disabled:
```
🔥  ERROR: The cause:
           {
            "thing": "because",
            "more": {
             "evenmore": [
              {
               "reason": "buffer"
              }
             ]
            }
           }
```

### `flags`
_(object)_

The flags are the strings shown in front of each message. The defaults are:

```
banner: ` 📣  `,
error: ` 🔥  ERROR: `,
info: ` 🔔  INFO: `,
ok: ` 👍  `,
done: ` 🚀  DONE `,
time: ` 🕐  [${ Style.bold('#timestamp#') }]`,
verbose: ` 😬  VERBOSE: `,
```

The string `#timestamp#` is replaced with the current timestamp.


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Tests

To run the tests for this package run `npm test`. [Jest](https://facebook.github.io/jest/) will run unit tests.
There is also a `npm run test:watch` script that can be used while developing.


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Release History

* v0.1.0  - 💥 Initial version


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## License

Copyright (c) Dominik Wilkowski.
Licensed under [GNU-GPLv3](https://raw.githubusercontent.com/dominikwilkowski/log/master/LICENSE).


**[⬆ back to top](#contents)**

# };
