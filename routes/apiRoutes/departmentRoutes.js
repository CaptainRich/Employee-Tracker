
// Import the required modules
const express = require('express');
const router = require('express').Router();
//const db      = require('staff_db');

//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
// Define the routes for the company departments

// This will return all departments in the database.
router.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully retrieved departments.',
        data: rows
      });
    });
  });

///////////////////////////////////////////////////////////////////////////////////
 // This will return add a new department in the database.
router.post('/api/department', (req, res) => {
    const sql = `INSERT INTO department`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully added a department.',
        data: rows
      });
    });
  });







module.exports = router;