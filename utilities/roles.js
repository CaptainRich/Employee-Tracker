// Import necessary components
const inquirer      = require( 'inquirer' );

//////////////////////////////////////////////////////////////////////////////////////
// Functions associated with employee roles.


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employee roles.
function getRoles( connection ) {

    console.log('Current employee roles');
    //console.log( mainMenu );

    connection.query(
        'SELECT * FROM role', (err, res) => {
            if (err) throw err;                               // abort on a failure
            console.table(res);
        }
    );
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee role.
function addRole( connection ) {

    console.log('Adding a new role');
    inquirer.prompt( [
        {
            name: "title",
            message: "What is the new role name?",
            type: "text",
            validate: titleNameInput => {
                if (titleNameInput) {
                    return true;
                } else {
                    console.log("Please enter the role name!");
                    return false;
                }
            }
        },
        {
            name: "salary",
            message: "What is the salary for this role?",
            type: "text" ,
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Please enter the salary for this role!");
                    return false;
                }
            }
        },
        {
            name: "department_id",
            message: "What is the department role?",
            type: "text" ,
            validate: department_idInput => {
                if (department_idInput) {
                    return true;
                } else {
                    console.log("Please enter the department this role!");
                    return false;
                }
            }
        }
    ])
        .then(data => {
            createRole(data, connection)
                .then(console.log("Role added"));

        })
};

///////////////////////////////////////////////////////////////////////////////////
// Create a new role
// Promise function to perform the addition to the database
function createRole(data, connection) {  

    //console.log(data);

    return connection.promise().query( 'INSERT INTO role SET ?', 
                                       {title: data.title, salary: data.salary, department_id: data.department_id},
        (err, res) => {
            if (err) throw err;                      // abort on a failure
            console.table(res);
        });
};


//////////////////////////////////////////////////////////////////////////////
// Routine to update an employee role.
function updateRole() {

    console.log('Updating an employee role');
    inquirer.prompt( [
        {
            name: "id",
            message: "What is the employee_id?",
            type: "input",
            validate: employee_idInput => {
                if (employee_idInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's ID!");
                    return false;
                }
            }
        },
        {
            name: "role_id",
            message: "What is the employee's new role_id?",
            type: "input",
            validate: role_idInput => {
                if (role_idInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's new role_ID!");
                    return false;
                }
            }
        }
    ])
    .then( data => {
        createUpdatedRole (data)
        .then( console.log("Employee modified") );
    });
};

//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createUpdatedRole(data) {   

    //console.log(data);
    return connection.promise().query(
        'UPDATE employee SET role_id = ? WHERE id = ? ', 
                              [data.role_id,  data.id],                   
            ( err, res ) => {
                if( err ) throw err;                      // abort on a failure
                console.table( res );
             }
    );
    
};
/////////////////////////////////////////////////////////////////////////////////////////////
// Export the functions used by the main menu routine.

module.exports  = {
    getRoles,
    addRole,
    updateRole
};