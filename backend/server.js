const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a secure key in production

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sqlCheck = "SELECT * FROM users WHERE email = ?";
        db.query(sqlCheck, [email], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                const sqlInsert = "INSERT INTO users (email, password) VALUES (?, ?)";
                db.query(sqlInsert, [email, hashedPassword], (err, result) => {
                    if (err) return res.status(500).json(err);
                    return res.status(201).json({ message: "User registered successfully" });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const user = data[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Authentication successful - generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: "Login successful", token });
    });
});

// Protect student routes with authentication middleware
app.get('/students', authenticateToken, (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/student/:id', authenticateToken, (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    const values = [req.params.id];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "Student not found" });
        return res.json(data[0]);
    });
});

app.post('/create', authenticateToken, (req, res) => {
    const sql = "INSERT INTO students (Name,email) VALUES(?,?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.put('/update/:id', authenticateToken, (req, res) => {
    const sql = "UPDATE students SET Name = ?, email = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.params.id
    ];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete('/delete/:id', authenticateToken, (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?";
    const values = [req.params.id];
    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json({ message: "Student deleted successfully" });
    });
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
