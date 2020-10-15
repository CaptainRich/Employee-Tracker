
// Import the required modules
const express = require('express');
const router = require('express').Router();
//const db      = require('staff_db');

//////////////////////////////////////////////////////////////////////////////////////
// Define the routes for the employee roles.

// This will return all parties in the database.
router.get('/api/role', (req, res) => {
    const sql = `SELECT * FROM role`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Successfully retrieved roles.',
        data: rows
      });
    });
  });


///////////////////////////////////////////////////////////////////////////////////
 // This will return add a new role in the database.
 router.post('/api/role', (req, res) => {
  const sql = `INSERT INTO role`;
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'Successfully added a role.',
      data: rows
    });
  });
});



///////////////////////////////////////////////////////////////////////////////////
// This will return update an employee's role in the database.
router.post('/api/role', (req, res) => {
  const sql1 = `SELECT * FROM employee WHERE last_name = ?`;
  const params = [];

  db.all(sql1, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'Successfully added a role.',
      data: rows
    });
  })
    .then((data) => {
      const sql2 = `UPDATE employee WHERE id = ?`, { id }, { role_id: id };
      const params = [];

      db.all(sql1, params, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.json({
          message: 'Successfully added a role.',
          data: rows
        });
      });
    });
});




module.exports = router;