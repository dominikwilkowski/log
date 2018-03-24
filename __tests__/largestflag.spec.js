/***************************************************************************************************************************************************************
 *
 * LargestFlag unit tests
 *
 **************************************************************************************************************************************************************/


const LargestFlag = require('../index.js').__test__.LargestFlag;


test('LargestFlag - should return the largest flag size', () => {
	expect( LargestFlag() ).toBe( 12 );
	expect( LargestFlag({ one: 'xx', two: 'xxxxxxxxxx', three: ' x' }) ).toBe( 10 );
	expect( LargestFlag({ one: 'xx              ', two: 'xxxxxxxxxx', three: ' x' }) ).toBe( 16 );
	expect( LargestFlag({ one: 'xx', two: 'x', three: ' x ' }) ).toBe( 3 );
});
