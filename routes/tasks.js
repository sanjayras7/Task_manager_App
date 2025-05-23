const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tasks
router.get('/', (req, res) => {
  db.query("SELECT * FROM tasks", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// POST create new task
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).send("Title is required");

  db.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description], (err, result) => {
    if (err) throw err;
    res.send("Task added");
  });
});

// PUT update task field
router.put('/:id', (req, res) => {
  const { field, value } = req.body;
  const { id } = req.params;
  if (!['title', 'description'].includes(field)) return res.status(400).send("Invalid field");

  db.query(`UPDATE tasks SET ${field} = ? WHERE id = ?`, [value, id], (err) => {
    if (err) throw err;
    res.send("Task updated");
  });
});

// DELETE a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.send("Task deleted");
  });
});

module.exports = router;
