/***************************************************************************************************************************************************************
 *
 * Better logging for your node app
 *
 * @repo    - https://github.com/dominikwilkowski/log
 * @author  - Dominik Wilkowski
 * @license - https://raw.githubusercontent.com/dominikwilkowski/log/master/LICENSE (GPL-3.0)
 *
 **************************************************************************************************************************************************************/

'use strict';


const TTY = require('tty');
const OS = require('os');


/**
 * Get the size of the cli window
 * A port from https://github.com/jonschlinkert/window-size
 *
 * @return {object} - An object with width and height
 */
const Size = () => {
	let width;
	let height;

	if( TTY.isatty( 1 ) ) {
		if( process.stdout.getWindowSize ) {
			width = process.stdout.getWindowSize( 1 )[ 0 ];
			height = process.stdout.getWindowSize( 1 )[ 1 ];
		}
		else if( TTY.getWindowSize ) {
			width = TTY.getWindowSize()[ 1 ];
			height = TTY.getWindowSize()[ 0 ];
		}
		else if( process.stdout.columns && process.stdout.rows ) {
			height = process.stdout.rows;
			width = process.stdout.columns;
		}
	}
	else if( OS.release().startsWith('10') ) {
		const numberPattern = /\d+/g;
		const cmd = 'wmic path Win32_VideoController get CurrentHorizontalResolution,CurrentVerticalResolution';
		const code = Spawn.execSync( cmd ).toString('utf8');
		const res = code.match( numberPattern );

		return {
			height: ~~res[ 1 ],
			width: ~~res[ 0 ],
		};
	}
	else {
		return {
			height: undefined,
			width: undefined,
		};
	}

	return {
		height: height,
		width: width,
	};
};


/**
 * Returning ansi escape color codes
 * Credit to: https://github.com/chalk/ansi-styles
 *
 * @type {Object}
 */
const Style = {

	/**
	 * Parse ansi code while making sure we can nest colors
	 *
	 * @param  {string} text  - The text to be enclosed with an ansi escape string
	 * @param  {string} start - The color start code, defaults to the standard color reset code 39m
	 * @param  {string} end   - The color end code
	 *
	 * @return {string}       - The escaped text
	 */
	parse: ( text /*: string */, start /*: string */, end /*: string */ = `39m` ) /*: string */ => {
		if( text !== undefined ) {
			const replace = new RegExp( `\\u001b\\[${ end }`, 'g' ); // find any resets so we can nest styles

			return `\u001B[${ start }${ text.toString().replace( replace, `\u001B[${ start }` ) }\u001b[${ end }`;
		}
		else {
			return ``;
		}
	},

	/**
	 * Strip all ansi codes from a string
	 *
	 * @param  {string} text - The text to be cleaned
	 *
	 * @return {string}      - The cleand text
	 */
	strip: ( text /*: string*/ ) /*: string */=> {
		const pattern = [
			'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
			'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
		].join('|');
		const ansi = new RegExp(pattern, 'g');

		if( typeof text === 'string' ) {
			return text.replace( ansi, '' );
		}
		else {
			return text;
		}
	},

	/**
	 * Style a string with ansi escape codes
	 *
	 * @param  {string} text - The string to be wrapped
	 *
	 * @return {string}      - The string with opening and closing ansi escape color codes
	 */
	black:   ( text /*: string */ ) /*: string */ => Style.parse( text, `30m` ),
	red:     ( text /*: string */ ) /*: string */ => Style.parse( text, `31m` ),
	green:   ( text /*: string */ ) /*: string */ => Style.parse( text, `32m` ),
	yellow:  ( text /*: string */ ) /*: string */ => Style.parse( text, `33m` ),
	blue:    ( text /*: string */ ) /*: string */ => Style.parse( text, `34m` ),
	magenta: ( text /*: string */ ) /*: string */ => Style.parse( text, `35m` ),
	cyan:    ( text /*: string */ ) /*: string */ => Style.parse( text, `36m` ),
	white:   ( text /*: string */ ) /*: string */ => Style.parse( text, `37m` ),
	gray:    ( text /*: string */ ) /*: string */ => Style.parse( text, `90m` ),
	bold:    ( text /*: string */ ) /*: string */ => Style.parse( text, `1m`, `22m` ),
};


/**
 * Insert all variables into the message with proper formatting.
 * Leave overabundance of placeholders intact and add surplus vars in the end.
 *
 * @param  {string} text - The message
 * @param  {array}  vars - All vars in an array to be insert into the message
 *
 * @return {string}      - The message with infused vars
 */
const InsertVars = ( text /*: string */, vars /*: array */ = [] ) /*: string */ => {
	const message = Style.strip( text );
	const occurences = ( message.match(/#/g) || [] ).length;

	return message
		.split('#')
		.map( ( item, i ) =>
			vars[ i ] !== undefined && i !== occurences
				? item + Style.yellow( JSON.stringify( vars[ i ], null, Log.pretty ? ' ' : null ) )
				: item + '#'
		)
		.join('')
		.slice( 0, -1 )
		.concat( occurences < vars.length
			? ` ${ vars.slice( occurences ).map( item => Style.yellow( JSON.stringify( item ) ) ) }`
			: ''
		);
};


/**
 * Calculate the largest flag size
 *
 * @param  {object} flags - An object of all flag messages
 *
 * @return {integer}      - The size of the largest flag
 */
const LargestFlag = ( flags /*: object */ = Log.flags ) /*: integer */ => Object.keys( flags )
	.filter( item => !Log.disableIndent.includes( item ) )
	.map( item => flags[ item ] )
	.reduce( ( a, b ) => a.length > b.length ? a : b )
	.length;


/**
 * Find new lines and add shoulders to them each
 *
 * @param  {string}  text     - The text to be indented
 * @param  {string}  type     - The type of message
 * @param  {integer} maxWidth - The width of the terminal, default: Size().width
 *
 * @return {string}           - The message nicely indented
 */
const IndentNewLines = ( text /*: string */, type /*: string */, maxWidth /*: integer */ = Size().width ) /*: string */ => {
	if( Log.disableIndent.includes( type ) || typeof text !== 'string' ) {
		return text;
	}
	else {
		const largestFlag = LargestFlag();
		const shoulder = ' '.repeat( largestFlag - 1 );

		return text
			.replace( /\r?\n|\r/g, '\n' )  // first we clean messy line breaks
			.split('\n')                   // then we take each line
			.map( line => {
				let width = largestFlag;     // and start with the default shoulder

				return line
					.split(' ')                // now we look at each word
					.map( word => {            // and see what length it is minus ansi codes
						width += Style.strip( word ).length + 1;

						if( width > maxWidth ) { // if we find a word will not fit
							width = largestFlag + Style.strip( word ).length + 1;
							                       // we add a new line and push the word onto that next line
							return `\n${ shoulder }${ word }`;
						}
						else {
							return word;
						}
					})
					.join(' ');
			})
			.join(`\n${ shoulder }`);      // and each new line already in the message gets a shoulder
	}
};


/**
 * Get shoulder message with flag and spacing
 *
 * @param  {string}  type  - The type of message
 * @param  {object}  flags - All flags in a neat object
 *
 * @return {string}        - The shoulder message
 */
const Shoulder = ( type /*: string */, flags /*: object */ = Log.flags ) /*: string */ => `${ flags[ type ] }${ ' '.repeat(
		LargestFlag( flags ) - flags[ type ].length > 0
			? LargestFlag( flags ) - flags[ type ].length
			: 0
	) }`;


/**
 * Filter verbose text by a regex match
 *
 * @param  {string} text   - The message that is about to be send to stdout
 * @param  {string} filter - The string we filter our message by, default: Log.verboseFilter
 *
 * @return {boolean}       - Whether or not to show this message depending on the filter
 */
const Filter = ( text /*: string */, filter /*: string */ = Log.verboseFilter ) /*: boolean */ => {
	const re = new RegExp( filter, 'g' );

	return text.match( re );
};


/**
 * Format a message by type
 *
 * @param  {string} type - The type of message
 * @param  {string} text - The message
 * @param  {array}  vars - All variables to be placed into the message
 *
 * @return {string}      - The formated message with vars and indentation
 */
const Output = ( type /*: string */, text /*: string */, vars /*: array */ ) /*: string */ => {
	const shoulder = Shoulder( type ).replace( /#timestamp#/g, new Date().toString() );
	const linebreak = Log.disableIndent.includes( type ) ? '\n' : '';
	const message = IndentNewLines( InsertVars( text, vars ), type );

	return `${ shoulder }${ linebreak }${ message }`;
};


/**
 * A logging object
 *
 * @type {Object}
 */
const Log = {
	/**
	 * Settings
	 */
	verboseMode: false,        // verbose flag
	verboseFilter: '',         // verbose filter
	disableIndent: [ 'time' ], // disable indentation for new lines
	pretty: false,             // enable pretty printing variables
	flags: {                   // all flag messages
		banner: ` 📣  `,
		error: ` 🔥  ERROR: `,
		info: ` 🔔  INFO: `,
		ok: ` 👍  `,
		done: ` 🚀  DONE `,
		time: `[${ Style.bold('#timestamp#') }]`,
		verbose: ` 😬  `,
	},

	/**
	 * Log calls
	 *
	 * @param  {string} text - The message you want to log
	 */
	banner:  ( text /*: string */, ...vars ) /*: void */ => console.log( Output( 'banner', text, vars ) ),
	error:   ( text /*: string */, ...vars ) /*: void */ => console.error( Style.red( Output( 'error', text, vars ) ) ),
	info:    ( text /*: string */, ...vars ) /*: void */ => console.info( Output( 'info', text, vars ) ),
	ok:      ( text /*: string */, ...vars ) /*: void */ => console.log( Style.green( Output( 'ok', text, vars ) ) ),
	done:    ( text /*: string */, ...vars ) /*: void */ => console.log( Style.green( Output( 'done', text, vars ) ) ),
	time:    ( text /*: string */, ...vars ) /*: void */ => console.log( Output( 'time', text, vars ) ),
	verbose: ( text /*: string */, ...vars ) /*: void */ => {
		const output = Output( 'verbose', text, vars );

		if( Filter( output ) && Log.verboseMode ) {
			console.log( output );
		}
	},

	__test__: {
		Size,
		Style,
		InsertVars,
		LargestFlag,
		IndentNewLines,
		Shoulder,
		Filter,
		Output,
	}
};


/**
 * EXPORT
 */
module.exports = exports = Log;
