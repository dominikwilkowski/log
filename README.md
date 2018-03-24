LOG
===

> Better logging for your node app


## Contents

* [Install](#install)
* [Use](#use)
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


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Settings

You can change the default settings via:

```js
Log.pretty = true;
```

A good example would be:

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
_(boolean)_  
default: `true`

Disable the indentation inside a single message.

Enabled:
```
🔔  INFO: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do "var!"
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation.
```

Disabled:
```
🔔  INFO:
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do "var!" eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation.
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
time: `[${ Style.bold('#timestamp#') }]`,
verbose: ` 😬  `,
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
