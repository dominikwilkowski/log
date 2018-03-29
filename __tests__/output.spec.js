/***************************************************************************************************************************************************************
 *
 * Output unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js')
const Output = Log.Output;
const Style = Log.Style;


test('Output - Should output the right flags and messages', () => {
	Log.flags = {
		one: 'xx: ',
		two: 'xxx: ',
		three: 'x: ',
	};

	expect( Output( 'one', 'message', [], 20 ) ).toBe('xx:  message');
	expect( Output( 'two', 'message', [], 20 ) ).toBe('xxx: message');
	expect( Output( 'three', 'message', [], 20 ) ).toBe('x:   message');
});


test('Output - Should insert vars', () => {
	Log.flags = {
		one: 'xx: ',
		two: 'xxx: ',
		three: 'x: ',
	};

	expect( Output( 'one', 'message #', ['one'], 20 ) ).toBe(`xx:  message ${ Style.yellow('"one"') }`);
	expect( Output( 'two', '# message', [{thing:'thang'}], 31 ) ).toBe(`xxx: ${ Style.yellow('{"thing":"thang"}') } message`);
	expect( Output( 'three', 'message', [5,'five'], 30 ) ).toBe(`x:   message ${ Style.yellow('5') }, ${ Style.yellow('"five"') }`);
});


test('Output - Should add new line where indentation is disabled', () => {
	Log.flags = {
		one: 'xx: ',
		two: 'xxx: ',
		three: 'x: ',
	};
	Log.disableIndent = ['three'];

	expect( Output( 'three', 'message', [], 20 ) ).toBe('x:   \nmessage');
});


test('Output - Should throw an error and exit if a type is used that doesn’t exist', () => {
	Log.flags = {
		one: 'xx: ',
		two: 'xxx: ',
		three: 'x: ',
	};
	Log.disableIndent = [];
	console.error = jest.fn();

	expect( Output( 'four', 'message', [], 20 ) ).toBe( '' );
	expect( console.error.mock.calls[0][0] )
		.toBe(
			Style.red(`Error: Type ${ Style.yellow('four') } was not recognized. Can only be one of:\n${
				Style.yellow( [ 'hr', ...Object.keys( Log.flags ) ].join(', ') )
			}`)
		);
});
