// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer     = require( 'inquirer' );
const mysql        = require( 'mysql2' );

const { mainMenu } = require( './utilities/menu' );



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



//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company departments.
function getDepartments() {

    console.log('Current departments');

    connection.query(
        'SELECT * FROM department', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu( connection );
        }
    
    );
};



//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employees.
function getEmployees() {

    console.log('Current employees');

    // This shows the employee table:  
    //connection.query( 'SELECT * FROM employee',

    // This works
    //'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.id=role.id'

    // This works
    //'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, department.department_name, employee.manager_id FROM employee INNER JOIN  department ON employee.department_id=department.id'

    // This works
    //'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.department_name, employee.manager_id FROM employee INNER JOIN role ON employee.id=role.id INNER JOIN department ON employee.department_id=department.id', 


    connection.query(
    'SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, role.salary, department.department_name, managers.manager_name FROM employee INNER JOIN role ON employee.id=role.id INNER JOIN department ON employee.department_id=department.id INNER JOIN managers ON employee.manager_id=managers.id', 
        ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu( connection );
        }
    
    );
};



//////////////////////////////////////////////////////////////////////////////
// Routine to add a new company department.

function addDepartment() {

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
        createDepartment (department_name)
        .then( console.log("Department added") )
        .then( ()=> mainMenu( connection ) );

    })
};
//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createDepartment( department_name ) {

    //console.log( "Department Name: ", department_name );
    return connection.promise().query('INSERT INTO department SET ?', {department_name: department_name},
    ( err, res ) => {
        if( err ) throw err;                               // abort on a failure
        console.table( res );
    } );
}






//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee.
function addEmployee() {

    console.log('Adding a new employee');
    inquirer.prompt( [
        {
            name: "first_name",
            message: "What is the new employee's first name?",
            type: "input",
            validate: first_nameInput => {
                if (first_nameInput) {
                    return true;
                } else {
                    console.log("Please enter the first name!");
                    return false;
                }
            }
        },
        {
            name: "last_name",
            message: "What is the new employee's last name?",
            type: "input",
            validate: last_nameInput => {
                if (last_nameInput) {
                    return true;
                } else {
                    console.log("Please enter the last name!");
                    return false;
                }
            }
        },
        {
            name: "role_id",
            message: "What is the new employee's roll_id?",
            type: "input",
            validate: role_idInput => {
                if (role_idInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's role_id!");
                    return false;
                }
            }
        },
        {
            name: "department_id",
            message: "What is the new employee's department_id?",
            type: "input",
            validate: department_idInput => {
                if (department_idInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's department_id!");
                    return false;
                }
            }
        },
        {
            name: "manager_id",
            message: "What is the new employee's manager_id?",
            type: "input",
            validate: manager_idInput => {
                if (manager_idInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's manager_id!");
                    return false;
                }
            }
        }
    ])
    .then( data => {
        createEmployee (data)
        .then( console.log("Employee added") )
        .then( ()=> mainMenu( connection ) );
    });
};
//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createEmployee(data) {  

    //console.log(data);
    return connection.promise().query( 'INSERT INTO employee SET ?', 
                              {first_name: data.first_name, last_name: data.last_name, role_id: data.role_id, manager_id: data.manager_id, department_id: data.department_id},
        (err, res) => {
            if (err) throw err;                      // abort on a failure
            console.table(res);
        }
    );
};


