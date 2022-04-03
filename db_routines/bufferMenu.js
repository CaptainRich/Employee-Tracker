// This routine is a buffer, to invoke the Main Menu from the 'promises'
// of the individual function routines.

const { mainMenu } = require( './menu' );

function bufferMenu( connection )  {

    mainMenu( connection );

}

//////////////////////////////////////////////////////////////////////////////////////////////
// Export the mainMenu function.

module.exports = { bufferMenu };