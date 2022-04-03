/////////////////////////////////////////////////////////////////////
// Import the necessary node modules

const inquirer                          = require( 'inquirer' );
const { getRoles, addRole, updateRole } = require('./roles');
const { getDepartments, addDepartment } = require('./departments');
const { getEmployees, addEmployee }     = require('./employees');


//////////////////////////////////////////////////////////////////////
// Main Menu Function

// The Main Menu obtains the desired action.  This is recursive  since 
// control will always return here.

function mainMenu( connection )  {

    var lexit = true;

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
                    getDepartments( connection );
                    break;

                case "View All Roles":
                    getRoles( connection );
                    break;
                    
                case "View All Employees":
                    getEmployees( connection );
                    break;
                                        
                case "Add a Department":
                    addDepartment( connection );
                    break;
                                                            
                case "Add a Role":
                    addRole( connection);
                    break;
                                                                                
                case "Add an Employee":
                    addEmployee( connection );
                    break;
                                                                                                    
                case "Update an Employee Role":
                    updateRole( connection );
                    break;

                case "Finish":
                    connection.end();
                    lexit = false;
                    break;

                default:
                    break;
            };
            // Set the time delay here so the results of the database query are displayed
            // before the menu is put back up. 1 second seems to be enough.
            if( lexit ) {
                setTimeout( () => {mainMenu( connection )}, 5000);
            }
        });            
}
//};

//////////////////////////////////////////////////////////////////////////////////////////////
// Export the mainMenu function.

module.exports = { mainMenu };