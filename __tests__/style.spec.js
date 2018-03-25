/***************************************************************************************************************************************************************
 *
 * Style unit tests
 *
 **************************************************************************************************************************************************************/


const Style = require('../index.js').Style;


test('Style.parse - undefined argument should return empty string', () => {
	expect( Style.parse( undefined ) ).toBe('');
});


test('Style.parse - start and end ansi code is correctly added', () => {
	expect( Style.parse( 'TEST', '666m', '777m' ) ).toBe('\u001B[666mTEST\u001b[777m');
});


test('Style.parse - start and end ansi code can be nested', () => {
	expect( Style.parse( `TEST ${ Style.parse( 'SUBTEST', '666m', '777m' ) } STRING`, '666m', '777m' ) )
		.toBe('\u001B[666mTEST \u001B[666mSUBTEST\u001B[666m STRING\u001b[777m');
});


test('Style.strip - should return if a non string was given', () => {
	expect( Style.strip( ['?'] ) ).toEqual( ['?'] );
	expect( Style.strip( undefined ) ).toEqual( undefined );
});


test('Style.strip - should remove all ansi codes', () => {
	expect( `TEST ${ Style.strip( Style.blue( Style.red('red') ) ) } STRING` )
		.toBe('TEST red STRING');

	expect( Style.strip(`\u001B[666mTEST \u001B[666mSUBTEST\u001B[666m STRING\u001b[777m`) )
		.toBe('TEST SUBTEST STRING');

	expect( Style.strip( Style.yellow(`yellow text ${ Style.green(`green text ${ Style.red(`red text`) } green text`) } yellow text`) ) )
		.toBe('yellow text green text red text green text yellow text');
});


test('Style.[style] - functions should return correct string and color', () => {
	expect( Style.black('test black') ).toBe('\u001B[30mtest black\u001b[39m');
	expect( Style.red('test red') ).toBe('\u001B[31mtest red\u001b[39m');
	expect( Style.green('test green') ).toBe('\u001B[32mtest green\u001b[39m');
	expect( Style.yellow('test yellow') ).toBe('\u001B[33mtest yellow\u001b[39m');
	expect( Style.blue('test blue') ).toBe('\u001B[34mtest blue\u001b[39m');
	expect( Style.magenta('test magenta') ).toBe('\u001B[35mtest magenta\u001b[39m');
	expect( Style.cyan('test cyan') ).toBe('\u001B[36mtest cyan\u001b[39m');
	expect( Style.white('test white') ).toBe('\u001B[37mtest white\u001b[39m');
	expect( Style.gray('test gray') ).toBe('\u001B[90mtest gray\u001b[39m');
	expect( Style.bold('test bold') ).toBe('\u001B[1mtest bold\u001b[22m');
});


test('should be able to combine multiple strings of varying colors', () => {
	const test = Style.yellow(`yellow text ${ Style.green(`green text ${ Style.red(`red text`) } green text`) } yellow text`);

	expect( test ).toBe('\u001B[33myellow text \u001B[32mgreen text \u001B[31mred text\u001B[32m green text\u001B[33m yellow text\u001b[39m');
});
