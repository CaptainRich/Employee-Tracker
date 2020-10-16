// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer    = require( 'inquirer' );
const mysql       = require( 'mysql2' );


// Import the 'api' routes for this application from our subdirectories
//const { getRoles, getDepartments, getEmployees, addDepartment, addRole, addEmployee, updateRole } = 
//      require('./routes/apiRoutes/index');


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
    connection.setMaxListeners(100);
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
                    //mainMenu();

                case "View All Roles":
                    getRoles();
                    //mainMenu();
                    
                case "View All Employees":
                    getEmployees();
                    //mainMenu();
                                        
                case "Add a Department":
                    addDepartment();
                    mainMenu();
                                                            
                case "Add a Role":
                    addRole();
                    mainMenu();
                                                                                
                case "Add an Employee":
                    addEmployee();
                    mainMenu();
                                                                                                    
                case "Update an Employee Role":
                    updateRole();
                    mainMenu();

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
getDepartments = () => {

    console.log('Here are all the departments');

    const query = connection.query(
        'SELECT * FROM department', function( err, res ) {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employee roles.
getRoles = () => {

    console.log('Here are all the employee roles');

    const query = connection.query(
        'SELECT * FROM role', function( err, res ) {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employees.
getEmployees = () => {

    console.log('Here are all the employees');

    const query = connection.query(
        'SELECT * FROM employee', function( err, res ) {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};



//////////////////////////////////////////////////////////////////////////////
// Routine to add a enw company department.
addDepartment = () => {

    console.log('Adding a new department');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the new department name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        const query = connection.query(
            'INSERT INTO department SET ?', [{deptName}],                    
            function( err, res ) {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
            }
        );
    })
};


//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee role.
addRole = () => {

    console.log('Adding a new role');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the new role name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        const query = connection.query(
            'INSERT INTO role SET ?', [{deptName}],                    
            function( err, res ) {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
            }
        );
    })
};


//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee.
addEmployee = () => {

    console.log('Adding a new employee');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the new employee name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        const query = connection.query(
            'INSERT INTO employee SET ?', [{deptName}],                    
            function( err, res ) {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
            }
        );
    })
};


//////////////////////////////////////////////////////////////////////////////
// Routine to update an employee role.
updateRole = () => {

    console.log('Updating an employee role');
    inquirer.prompt( [
        {
            name: "deptName:",
            message: "What is the employee name?",
            type: "input"
        }
    ])
    .then( ({deptName}) => {
        const query = connection.query(
            'INSERT INTO employee SET ?', [{deptName}],                    
            function( err, res ) {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
            }
        );
    })
};