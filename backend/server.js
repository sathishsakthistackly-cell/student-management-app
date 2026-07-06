const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Create MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed!");
        console.log(err);
        return;
    }

    console.log("Connected to MySQL Database");
});

// Health API
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Backend is running successfully!"
    });
});

// Get All Students
app.get("/students", (req, res) => {

    db.query("SELECT * FROM students", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// Add Student
app.post("/students", (req, res) => {

    const { name, course } = req.body;

    db.query(
        "INSERT INTO students(name,course) VALUES (?,?)",
        [name, course],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Added Successfully"
            });

        }
    );

});

// Delete Student
app.delete("/students/:id", (req, res) => {

    db.query(
        "DELETE FROM students WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Deleted Successfully"
            });

        }
    );

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});