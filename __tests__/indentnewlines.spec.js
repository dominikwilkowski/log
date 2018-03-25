/***************************************************************************************************************************************************************
 *
 * IndentNewLines unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js');
const IndentNewLines = Log.__test__.IndentNewLines;
const LargestFlag = Log.__test__.LargestFlag;


test('IndentNewLines - should return if text is not string', () => {
	expect( IndentNewLines( ['?'], 'thing' ) ).toEqual( ['?'] );
	expect( IndentNewLines( undefined, 'thing' ) ).toEqual( undefined );
});


test(`IndentNewLines - should return if this type has had it’s indentation disabled`, () => {
	Log.disableIndent = ['thing'];

	expect( IndentNewLines( 'nothing to do here', 'thing', 5 ) ).toEqual( 'nothing to do here' );
});


test(`IndentNewLines - should indent newlines appropriately`, () => {
	Log.flags = {
		thing: 'xx: ',
		thang: 'xxx: ',
	};
	Log.disableIndent = [''];
	const shoulder = ' '.repeat( LargestFlag() - 1 );

	expect( IndentNewLines( 'nothing to do here', 'thing', 13 ) ).toEqual( `nothing \n${ shoulder }to do \n${ shoulder }here` );
	expect( IndentNewLines( 'nothing to\ndo here', 'thing', 13 ) ).toEqual( `nothing \n${ shoulder }to\n${ shoulder }do here` );
});
