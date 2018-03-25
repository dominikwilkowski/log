LOG [![Build Status](https://travis-ci.org/dominikwilkowski/log.svg?branch=master)](https://travis-ci.org/dominikwilkowski/log)
===

> Better logging for your node app

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log.png)


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
npm install indent-log
```


**[⬆ back to top](#contents)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Use

Run the logger via:

```js
const Log = require('indent-log');

Log.banner( 'My app started' );
Log.info( 'Server running at #', IPandPort );
```


### Vocabulary

You got a bunch of logs to chose from:

```js
Log.banner('Banner log');
Log.ok('Ok log');
Log.error('Error log');
Log.info('Info log');
Log.done('Done log');
Log.verbose('Verbose log');
Log.hr();
Log.time('Time log');
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log7.png)

`Log.hr()` will output a line that will fill the terminal and a line break before and after.


### Variables

You can add variables by adding them as arguments. Each placeholder `#` will be replaced one by one with those variables. If you don’t have enough placeholder
the variables will be appended at the end:

```js
Log.info( 'running function in folder # to find #', 'folder', 'needle' );

Log.info( 'running function in folder # to find #', 'folder' );

Log.info( 'running function in folder # to find #', 'folder', 'needle', 42, [ 'one', 'two' ] );
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log2.png)

All variables are colored yellow to make reading easier.


### Indentation

Logs that run over the space you have in your terminal will automatically indent on the next line:

```js
Log.info('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
	'Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
	'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
	'culpa qui officia deserunt mollit anim id est laborum.');
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log3.png)

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
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log4.png)

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
const Log = require('indent-log');

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

An example script for your cli app would be:

```js
if( process.argv.includes('-v') || process.argv.includes('--verbose') ) {
	Log.verboseMode = true;

	const flagParam = ( process.argv.indexOf('-v') !== -1 ? process.argv.indexOf('-v') : process.argv.indexOf('--verbose') ) + 1;
	const verboseFilter = process.argv[ flagParam ] && process.argv[ flagParam ].startsWith('-') ? undefined : process.argv[ flagParam ];

	if( verboseFilter ) {
		Log.verboseFilter = verboseFilter;
	}
}
```

Now the user can use your app with an optional filter like:

```shell
yourapp -v onlythisstring
```

And Log will filter by this word.


### `disableIndent`
_(array)_  
default: `[ 'time' ]`

All messages are indented by the largest flag of all types. You can disable a particular type if that type has a very large flag that would make indentation
of all other look ridicules. Below is what it looks like by default because the type `time` has it's indent disabled.

```js
Log.banner('Banner log');
Log.ok('Ok log');
Log.error('Error log');
Log.info('Info log');
Log.done('Done log');
Log.verbose('Verbose log');
Log.time('Time log');
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log5.png)

This is what it would look like if you enabled all indentation and included `time`:

```js
Log.disableIndent = [];

Log.banner('Banner log');
Log.ok('Ok log');
Log.error('Error log');
Log.info('Info log');
Log.done('Done log');
Log.verbose('Verbose log');
Log.time('Time log');
```

![Log output](https://raw.githubusercontent.com/dominikwilkowski/log/master/assets/log6.png)

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

```js
Log.flags = {
	banner: ` 📣  `,
	error: ` 🔥  ERROR: `,
	info: ` 🔔  INFO: `,
	ok: ` 👍  `,
	done: ` 🚀  DONE: `,
	time: ` 🕐  [${ Log.Style.bold('#timestamp#') }]`,
	verbose: ` 😬  VERBOSE: `,
};
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
