/***************************************************************************************************************************************************************
 *
 * Filter unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js')
const Filter = Log.__test__.Filter;


test('Filter - should run regex correctly', () => {
	expect( Filter( 'haystack with hay', 'needle' ) ).toBeFalsy();
	expect( Filter( 'haystack with hay', 'hay' ) ).toBeTruthy();
	expect( Filter( 'haystack with hay', '^hay' ) ).toBeTruthy();
	expect( Filter( 'haystack with hay', '^stack' ) ).toBeFalsy();
	expect( Filter( 'haystack with hay', 'stack' ) ).toBeTruthy();
	expect( Filter( 'haystack with hay', '[0-9]' ) ).toBeFalsy();
	expect( Filter( 'haystack with 7 hay', '[0-9]' ) ).toBeTruthy();
	expect( Filter( 'haystack with hay', '(with).(hay)' ) ).toBeTruthy();
});
