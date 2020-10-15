// Main controller for the Employee Tracker

// Reference/import the other packages and modules needed
const inquirer    = require( 'inquirer' );
const express     = require( 'express' );
const mysql       = require( 'mysql2' );

// Import the 'api' routes for this application from our subdirectories
const { getRoles, getDepartments, getEmployees, addDepartment, addRole, addEmployee, updateRole } = 
      require('./routes/apiRoutes/index');



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
                
                console.log('Here are all the departments');
                getDepartments();
                return getAction();
            };


            // View all the roles
            if( selected === 2) {
                
                console.log('Here are all the employee roles');
                getRoles();
                return getAction();
            };
            

            // View all the employees
            if( selected === 3) {
                
                console.log('Here are all the employees');
                getEmployees();
                return getAction();
            };
            

            // Add a new department
            if( selected === 4) {
                
                console.log('Adding a new department');
                addDepartment();
                return getAction();
            };
                        

            // Add a new role
            if( selected === 5) {
                
                console.log('Adding a new role');
                addRole();
                return getAction();
            };
                                    

            // Add a new employee
            if( selected === 6) {
                
                console.log('Adding a new employee');
                addEmployee();
                return getAction();
            };
                                                

            // Update an employee role
            if( selected === 7) {
                
                console.log('Updating an employee role');
                updateRole();
                return getAction();
            };

        });            

};

/////////////////////////////////////////////////////////////////////////////////////////////////
// Setup the connection to the database

// var con = mysql.createConnection( {
//     host: "localhost",
//     user: "Rich_",
//     password: "Learning_2020"
// });

// con.connect( function(err) {
//     if( err ) throw err;
//     console.log( "Connected to MySQL database." );
// });



// Use our routing routines
const app = express();
app.use( express.urlencoded( { extend: true } ) );

getAction();