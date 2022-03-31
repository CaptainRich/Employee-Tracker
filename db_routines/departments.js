// Import necessary components
const inquirer      = require( 'inquirer' );

//////////////////////////////////////////////////////////////////////////////////////
// Functions associated with department activities.


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company departments.
function getDepartments( connection ) {

    console.log('Current departments');

    connection.query(
        'SELECT * FROM department', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            //mainMenu( connection );
        }
    
    );
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new company department.

function addDepartment( connection ) {

    //console.log('Adding a new department');
    inquirer.prompt( [
        {
            name: "name",
            message: "What is the new department name?",
            type: "input"
        }
    ])
    .then( response => {
        //console.log( response );
        let department_name = response.name;
        createDepartment ( connection, department_name )
        .then( console.log("Department added") )
        .then( ()=> mainMenu( connection ) );

    })
};

//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createDepartment( connection, department_name ) {

    //console.log( "Department Name: ", department_name );
    return connection.promise().query('INSERT INTO department SET ?', {department_name: department_name},
    ( err, res ) => {
        if( err ) throw err;                               // abort on a failure
        console.table( res );
    } );
}


/////////////////////////////////////////////////////////////////////////////////////////////
// Export the functions used by the main menu routine.

module.exports  = {
    getDepartments,
    addDepartment
};