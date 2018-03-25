/***************************************************************************************************************************************************************
 *
 * Log unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js');
const Style = Log.Style;


test('Log.[type] - should begin with the right flag', () => {
	console.log = jest.fn();
	console.info = jest.fn();
	console.error = jest.fn();

	Log.banner('banner'); // log
	Log.error('error');   // error
	Log.info('info');     // info
	Log.ok('ok');         // log
	Log.done('done');     // log

	expect( console.log.mock.calls.length ).toBe( 3 );
	expect( console.info.mock.calls.length ).toBe( 1 );
	expect( console.error.mock.calls.length ).toBe( 1 );

	expect( Style.strip( console.log.mock.calls[0][0] ).startsWith( Log.flags.banner ) ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[0][0] ).endsWith('banner') ).toBeTruthy();

	expect( Style.strip( console.error.mock.calls[0][0] ).startsWith( Log.flags.error ) ).toBeTruthy();
	expect( Style.strip( console.error.mock.calls[0][0] ).endsWith('error') ).toBeTruthy();

	expect( Style.strip( console.info.mock.calls[0][0] ).startsWith( Log.flags.info ) ).toBeTruthy();
	expect( Style.strip( console.info.mock.calls[0][0] ).endsWith('info') ).toBeTruthy();

	expect( Style.strip( console.log.mock.calls[1][0] ).startsWith( Log.flags.ok ) ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[1][0] ).endsWith('ok') ).toBeTruthy();

	expect( Style.strip( console.log.mock.calls[2][0] ).startsWith( Log.flags.done ) ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[2][0] ).endsWith('done') ).toBeTruthy();

});


test('Log.verbose - should log nothing with verboseMode false', () => {
	console.log = jest.fn();

	Log.verboseMode = false;

	Log.verbose(`test`);
	Log.verbose(`test2`);

	expect( console.log.mock.calls.length ).toBe( 0 );
});


test('Log.verbose - should log with verboseMode true', () => {
	console.log = jest.fn();

	Log.verboseMode = true;

	Log.verbose(`test`);
	Log.verbose(`test2`);

	expect( console.log.mock.calls.length ).toBe( 2 );

	expect( Style.strip( console.log.mock.calls[0][0] ).startsWith( Log.flags.verbose ) ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[0][0] ).endsWith('test') ).toBeTruthy();

	expect( Style.strip( console.log.mock.calls[1][0] ).startsWith( Log.flags.verbose ) ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[1][0] ).endsWith('test2') ).toBeTruthy();
});


test('Log.time - should log its message', () => {
	console.log = jest.fn();

	Log.time(`test`);
	Log.time(`test2`);

	expect( console.log.mock.calls.length ).toBe( 2 );

	expect( Style.strip( console.log.mock.calls[0][0] ).endsWith('test') ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[1][0] ).endsWith('test2') ).toBeTruthy();
});


test('Log.hr - should log a long line', () => {
	console.log = jest.fn();

	Log.hr( 10 );

	expect( console.log.mock.calls.length ).toBe( 1 );

	expect( Style.strip( console.log.mock.calls[0][0] ).startsWith('\n ') ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[0][0] ).endsWith(' \n') ).toBeTruthy();
	expect( Style.strip( console.log.mock.calls[0][0] ) ).toBe('\n ════════ \n');
});
