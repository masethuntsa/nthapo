// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8088;
// Middleware
app.use(cors());
app.use(bodyParser.json());
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update your MySQL username
    password: '123456', // Update your MySQL password
    database: 'school' // Use the created database
});
// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});
// User Management API Endpoints
// Create User
app.post('/api/users', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO MyUsers (username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, username });
    });
});
// Get Users
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Update User
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;
    const query = 'UPDATE users SET username = ?, password = ?';
    db.query(query, [username, password, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'User updated successfully' });
    });
});
// Delete User
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'User deleted successfully' });
    });
});
// Product Management API Endpoints
// Create Product
app.post('/api/products', (req, res) => {
    const { name, description, category, price, quantity } = req.body;
    const query = 'INSERT INTO MyProducts (name, description, category, price, quantity) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, category, price, quantity], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, name, description, category, price, quantity });
    });
});
// Get Products
app.get('/api/products', (req, res) => {
    const query = 'SELECT * products';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
// Update Product
app.put('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, category, price, quantity } = req.body;
    const query = 'UPDATE MyProducts SET name = ?, description = ?, category = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(query, [name, description, category, price, quantity, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Product updated successfully' });
    });
});
// Delete Product
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM MyProducts WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Product deleted successfully' });
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});