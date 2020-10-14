// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer    = require( 'inquirer' );





///////////////////////////////////////////////////////////////////////////////////////
// On startup, get the desired action.  This needs to be a recursive action since 
// control will always return here.

const getAction = () => {

    return inquirer.prompt([
        {   // Prompt the business owner for the next action
            type: 'list',
            name: 'action',
            message: 'Select the desired action, or Finish?',
            choices: ['1: View All Departments', '2: View All Roles', '3: View All Employees', '4 Add a Department', '5 Add a Role', '6 Add an Employee', '7 Update an Employee Role', '8 Finish']
        }
    ])
        .then(({ action }) => {
            // Get the selected action
            const selection = action.split(': ');
            const selected = parseInt(selection[0].trim());
            console.log('Selected action is: ' + selected);


            // View all the departments
            if( selected === 1) {
                //viewAllDepartments();
                console.log('Here are all the departments');
                return getAction();
            };
        });
};



getAction();