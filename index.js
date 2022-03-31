// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer     = require( 'inquirer' );
const mysql        = require( 'mysql2' );

const { mainMenu } = require( './db_routines/menu' );



/////////////////////////////////////////////////////////////////////////////////////////////////
// Setup the connection to the database, and if successful invoke the Main Menu.

const connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Learning_2020",
            database: "staff_db"
});

connection.connect( function(err) {
    if( err ) throw err;              // abort on connection error

    // Report the connection status and invoke the Main Menu to allow actions on the database.
    console.log( "Connected to MySQL database with ID: " + connection.threadId + "\n" );

    mainMenu( connection );

});

