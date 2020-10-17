// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer    = require( 'inquirer' );
const mysql       = require( 'mysql2' );


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
    //connection.setMaxListeners(100);
    mainMenu();
});

///////////////////////////////////////////////////////////////////////////////////////
// The Main Menu obtains the desired action.  This is recursive  since 
// control will always return here.

function mainMenu()  {

    inquirer.prompt([
        {   // Prompt the business owner for the next desired action
            type: 'list',
            name: 'pick',
            message: 'Select the desired action, or Finish?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Finish']
        }
    ])
        .then( response  => {
            // Get the selected action
            //const selection = action.split(': ');
            //const selected = parseInt(selection[0].trim());
            console.log('\nSelected action is: ' + response.pick + '\n');

            switch (response.pick) {

                case "View All Departments":
                    getDepartments();
                    break;

                case "View All Roles":
                    getRoles();
                    break;
                    
                case "View All Employees":
                    getEmployees();
                    break;
                                        
                case "Add a Department":
                    addDepartment();
                    break;
                                                            
                case "Add a Role":
                    addRole();
                    break;
                                                                                
                case "Add an Employee":
                    addEmployee();
                    break;
                                                                                                    
                case "Update an Employee Role":
                    updateRole();
                    break;

                case "Finish":
                    connection.end();
                    break;

                default:
                    mainMenu();
            };
        });            
};


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company departments.
function getDepartments() {

    console.log('Here are all the departments');

    connection.query(
        'SELECT * FROM department', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employee roles.
function getRoles() {

    console.log('Here are all the employee roles');

    connection.query(
        'SELECT * FROM role', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employees.
function getEmployees() {

    console.log('Here are all the employees');

    connection.query(
        'SELECT * FROM employee', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};



//////////////////////////////////////////////////////////////////////////////
// Routine to add a enw company department.

function addDepartment() {

    console.log('Adding a new department');
    inquirer.prompt( [
        {
            name: "name",
            message: "What is the new department name?",
            type: "input"
        }
    ])
    .then( response => {
        console.log( response );
        let name = response;
        createDepartment (name)
        .then( console.log("department added") )
        .then( ()=> mainMenu() );

    })
};
//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createDepartment( department) {

    
    return connection.promise().query('INSERT INTO department SET ?', department );
}


//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee role.
function addRole() {

    console.log('Adding a new role');
    inquirer.prompt( [
        {
            name: "roleName:",
            message: "What is the new role name?",
            type: "input"
        }
    ])
    .then( ({roleName}) => {
        connection.query(
            'INSERT INTO role SET ?', [{roleName}],                    
            ( err, res ) => {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
                mainMenu();
            }
        );
    })
};


//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee.
function addEmployee() {

    console.log('Adding a new employee');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the new employee name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        connection.query(
            'INSERT INTO employee SET ?', [{deptName}],                    
            ( err, res ) => {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
                mainMenu();
            }
        );
    })
};


//////////////////////////////////////////////////////////////////////////////
// Routine to update an employee role.
function updateRole() {

    console.log('Updating an employee role');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the employee name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        connection.query(
            'INSERT INTO employee SET ?', [{deptName}],                    
            ( err, res ) => {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
                mainMenu();
            }
        );
    })
};