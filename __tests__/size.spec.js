/***************************************************************************************************************************************************************
 *
 * Size unit tests
 *
 **************************************************************************************************************************************************************/


const Size = require('../index.js').__test__.Size;


test('Size should always return value for height and width', () => {
	const sizeOutput = {
		'height': expect.any( Number ),
		'width': expect.any( Number ),
	};

	expect( Size() ).toMatchObject( sizeOutput );
});
