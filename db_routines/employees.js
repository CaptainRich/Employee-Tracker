// Import necessary components
const inquirer      = require( 'inquirer' );

//////////////////////////////////////////////////////////////////////////////////////
// Functions associated with employees.

//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employees.
function getEmployees( connection ) {

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
            //mainMenu( connection );
        }
    
    );
};



//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee.
function addEmployee( connection ) {

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
        createEmployee ( connection, data )
        .then( console.log("Employee added") )
        .then( ()=> mainMenu( connection ) );
    });
};
//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createEmployee( connection, data) {  

    //console.log(data);
    return connection.promise().query( 'INSERT INTO employee SET ?', 
                              {first_name: data.first_name, last_name: data.last_name, role_id: data.role_id, manager_id: data.manager_id, department_id: data.department_id},
        (err, res) => {
            if (err) throw err;                      // abort on a failure
            console.table(res);
        }
    );
};

/////////////////////////////////////////////////////////////////////////////////////////////
// Export the functions used by the main menu routine.

module.exports  = {
    getEmployees,
    addEmployee
};