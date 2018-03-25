'use strict';

const Log = require('../index.js');

Log.info('testing \u001B[31mtesting\u001b[39mend');
Log.info('testing new thing # yay # and no # end in sight', 'steven', 'foo');
Log.info('not enough placeholders # here', 'steven', 'end', 'realend');
Log.error('look at this object # eh?!', { thing: 'wow', more: { evenmore: [{tots:'wow'}]}});

Log.pretty = true;
Log.error('look at this object # eh?!', { thing: 'wow', more: { evenmore: [{tots:'wow'}]}});

Log.hr();

Log.banner('banner');
Log.error('error');
Log.info('info');
Log.ok('ok');
Log.done('done');
Log.time('time');
Log.verbose('verbose');
Log.verbose('verbose');
Log.verbose('verbose');
Log.verbose('verbose');
Log.verbose('verbose');
Log.verboseMode = true;
Log.verbose('verbose');

Log.hr();

Log.info('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do # eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
	' Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
	' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
	'culpa qui officia deserunt mollit anim id est laborum.', 'var!');

Log.ok('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do # eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
	' Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
	' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
	'culpa qui officia deserunt mollit anim id est laborum.', 'var!');

Log.error('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do # eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
	' Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
	' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
	'culpa qui officia deserunt mollit anim id est laborum.', 'var!');

Log.time('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do # eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
	' Ut enim ad minim veniam, quis nostrud exercitation\nullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in' +
	' reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
	'culpa qui officia deserunt mollit anim id est laborum.', 'var!');

setTimeout(() => Log.time('time2'), 1000);

Log.hr();

Log.verboseFilter = 'stuff';
Log.verbose('banner');
Log.verbose('bannerstuffbanner');
Log.verbose('banner stuff banner');
Log.verbose('banner stuff');
Log.verbose('dontshow');

Log.verboseFilter = '';
Log.verbose('doshow');

Log.hr();


Log.flags.monkey = ' 🐒  monkey business: ';

Log.monkey = ( text, ...vars ) => console.log( Log.Style.magenta( Log.Output( 'monkey', text, vars ) ) ),

Log.banner('Monkey business starting now!');
Log.monkey('Hey hey!!!');

Log.hr();

Log.disableIndent = [];

Log.banner('banner');
Log.error('error');
Log.info('info');
Log.ok('ok');
Log.done('done');
Log.time('time');
Log.verbose('verbose');
