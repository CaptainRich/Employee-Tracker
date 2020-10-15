
// Import the required modules
const express = require('express');
const router  = express.Router();
const db      = require('../../db/staff_db');

//////////////////////////////////////////////////////////////////////////////////////
// Define the routes for the employee roles.

// This will return all parties in the database.
router.get('/role', (req, res) => {
    const sql = `SELECT * FROM role`;
    const params = [];
  
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'Success retrieved roles.',
        data: rows
      });
    });
  });






module.exports = router;