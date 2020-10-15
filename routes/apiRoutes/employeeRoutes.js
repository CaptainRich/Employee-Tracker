
// Import the required modules
const express = require('express');
const router = require('express').Router();
//const db      = require('staff_db');

//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Define the routes for the company employees

// This will return all employees in the database.
router.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully retrieved employees.',
        data: rows
      });
    });
  });


///////////////////////////////////////////////////////////////////////////////////
 // This will return add a new employee to the database.
 router.post('/api/employee', (req, res) => {
    const sql = `INSERT INTO employee`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully added an employee.',
        data: rows
      });
    });
  });






module.exports = router;