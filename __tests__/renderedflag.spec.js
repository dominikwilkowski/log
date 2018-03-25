/***************************************************************************************************************************************************************
 *
 * RenderedFlag unit tests
 *
 **************************************************************************************************************************************************************/


const RenderedFlag = require('../index.js').__test__.RenderedFlag;


test('RenderedFlag - should replace the timestamp', () => {
	expect( RenderedFlag('nothing to replace') ).toBe('nothing to replace');
	expect( RenderedFlag('nothing to #replace#') ).toBe('nothing to #replace#');
	expect( RenderedFlag('something #timestamp# to replace').startsWith('something ') ).toBeTruthy();
	expect( RenderedFlag('something #timestamp# to replace').endsWith(' to replace') ).toBeTruthy();
	expect( RenderedFlag('something #timestamp# to replace') !== 'something #timestamp# to replace' ).toBeTruthy();
});
