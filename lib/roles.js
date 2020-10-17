


//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company's employee roles.
function getRoles() {

    console.log('Current employee roles');

    connection.query(
        'SELECT * FROM role', ( err, res ) => {
            if( err ) throw err;                               // abort on a failure
            console.table( res );
            mainMenu();
        }
    
    );
};


//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee role.
function addRole() {

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
    .then( data => {
        createRole (data)
        .then( console.log("Role added") )
        .then( ()=> mainMenu() );
    })
};

//////////////////////////////////////////////////////////////////////
// Promise function to perform the addition to the database
function createRole(data) {  

    //console.log(data);

    return connection.promise().query( 'INSERT INTO role SET ?', 
                                       {title: data.title, salary: data.salary, department_id: data.department_id},
        (err, res) => {
            if (err) throw err;                      // abort on a failure
            console.table(res);
        });
};

module.exports = { getRoles,
                   addRole };