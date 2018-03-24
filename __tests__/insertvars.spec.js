/***************************************************************************************************************************************************************
 *
 * InsertVars unit tests
 *
 **************************************************************************************************************************************************************/


const Log = require('../index.js');
const InsertVars = Log.__test__.InsertVars;
const Style = Log.__test__.Style;


test('InsertVars - should return a message', () => {
	expect( InsertVars( 'message' ) ).toBe('message');
});


test('InsertVars - should insert vars correctly', () => {
	expect( InsertVars( 'message # end', [ 'var' ] ) ).toBe(`message ${ Style.yellow('"var"') } end`);
});


test('InsertVars - should insert overflow vars at the end', () => {
	expect( InsertVars( 'message # end', [ 'var', 'foo', 'bar' ] ) )
		.toBe(`message ${ Style.yellow('"var"') } end ${ Style.yellow('"foo"') },${ Style.yellow('"bar"') }`);
});


test('InsertVars - should leave placeholder alone if it runs out of vars', () => {
	expect( InsertVars( 'message # # # and # end', [ 'var' ] ) )
		.toBe(`message ${ Style.yellow('"var"') } # # and # end`);
});


test('InsertVars - should pretty print objects if Log.pretty is true', () => {
	Log.pretty = true;

	expect( InsertVars( 'message # end', [ {'var':'val'} ] ) )
		.toBe(`message ${ Style.yellow('{\n "var": "val"\n}') } end`);
});
