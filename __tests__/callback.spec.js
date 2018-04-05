/***************************************************************************************************************************************************************
 *
 * Callback unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js')
const Callback = Log.__test__.Callback;


test('Callback - Only callbacks that exist should be called', () => {
	console.log = jest.fn();

	Log.callbacks = {
		two: ( text, vars, type ) => console.log(`text: ${ text }; vars: ${ JSON.stringify( vars ) }, type: ${ type }`),
	};

	Callback( Log.callbacks, 'one', 'message1', [1,2] )
	Callback( Log.callbacks, 'two', 'message2', [1,2] )
	Callback( Log.callbacks, 'three', 'message3', [1,2] )

	expect( console.log.mock.calls[0][0] ).toBe('text: message2; vars: [1,2], type: two');
});
