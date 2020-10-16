

const express = require('express');
const router = require('express').Router();

router.use(require('../apiRoutes/departmentRoutes'));
router.use(require('../apiRoutes/employeeRoutes'));
router.use(require('../apiRoutes/roleRoutes'));

//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the employee roles.
var getRoles = function() {

    return $.ajax( {
        url: "/api/role",
        method: 'GET'
    });
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new company role.
var addRole = function() {

    return $.ajax( {
        url: "/api/role",
        method: 'POST'
    });
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new company role.
var updateRole = function() {

    // Need to prompt for the employee's name, whose role is to be updated.

    // Need to show the current role and prompt for the new role.

    return $.ajax( {
        url: "/api/role",
        method: 'UPDATE'
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
        }
    
    );
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new company department.
var addDepartment = function() {

    return $.ajax( {
        url: "/api/department",
        method: 'POST'
    });
};



//////////////////////////////////////////////////////////////////////////////
// Routine to obtain all of the company employees.
var getEmployees = function() {

    return $.ajax( {
        url: "/api/employee",
        method: 'GET'
    });
};

//////////////////////////////////////////////////////////////////////////////
// Routine to add a new employee.
var addEmployee = function() {

    return $.ajax( {
        url: "/api/employee",
        method: 'POST'
    });
};


module.exports = {  router,
                    getRoles,
                    addRole,
                    updateRole,
                    getDepartments,
                    addDepartment,
                    getEmployees,
                    addEmployee };