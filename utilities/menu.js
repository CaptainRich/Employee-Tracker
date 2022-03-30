/////////////////////////////////////////////////////////////////////
// Import the necessary node modules

const inquirer              = require( 'inquirer' );
const { getRoles, addRole, updateRole } = require('./roles');


//////////////////////////////////////////////////////////////////////
// Main Menu Function

// The Main Menu obtains the desired action.  This is recursive  since 
// control will always return here.

function mainMenu( connection )  {

    var iexit = 1;

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

            console.log('\nSelected action is: ' + response.pick + '\n');

            switch (response.pick) {

                case "View All Departments":
                    getDepartments();
                    break;

                case "View All Roles":
                    getRoles( connection );
                    break;
                    
                case "View All Employees":
                    getEmployees();
                    break;
                                        
                case "Add a Department":
                    addDepartment();
                    break;
                                                            
                case "Add a Role":
                    addRole( connection);
                    break;
                                                                                
                case "Add an Employee":
                    addEmployee();
                    break;
                                                                                                    
                case "Update an Employee Role":
                    updateRole();
                    break;

                case "Finish":
                    connection.end();
                    iexit = 0;
                    break;

                default:
                    //mainMenu( connection);
            };
            // Set the time delay here so the results of the database query are displayed
            // before the menu is put back up. 1 second seems to be enough.
            if( iexit ) {
                setTimeout( () => {mainMenu( connection )}, 1000);
            }
        });            
}
//};

//////////////////////////////////////////////////////////////////////////////////////////////
// Export the mainMenu function.

module.exports = { mainMenu };