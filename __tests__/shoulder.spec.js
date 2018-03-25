/***************************************************************************************************************************************************************
 *
 * Shoulder unit tests
 *
 **************************************************************************************************************************************************************/


const Shoulder = require('../index.js').__test__.Shoulder;


test('Shoulder - should align all shoulders', () => {
	expect( Shoulder( 'one', { one: 'xx', two: 'x', three: 'xxx' } ) ).toEqual( 'xx ' );
	expect( Shoulder( 'two', { one: 'xx', two: 'x', three: 'xxx' } ) ).toEqual( 'x  ' );
	expect( Shoulder( 'three', { one: 'xx', two: 'x', three: 'xxx' } ) ).toEqual( 'xxx' );
});
