const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "strange",
});

db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySQL connected...");
});

// Remove sign-up and login endpoints
// app.post("/signup", (req, res) => {
// 	const { username, password } = req.body;
// 	const query = "INSERT INTO registration (username, password) VALUES (?, ?)";
// 	db.query(query, [username, password], (err, result) => {
// 		if (err) {
// 			return res.status(500).send(err);
// 		}
// 		res.send("User registered successfully");
// 	});
// });

// app.post("/login", (req, res) => {
// 	const { username, password } = req.body;
// 	const query = "SELECT * FROM registration WHERE username = ? AND password = ?";
// 	db.query(query, [username, password], (err, results) => {
// 		if (err) {
// 			return res.status(500).send(err);
// 		}
// 		if (results.length > 0) {
// 			res.send("Login successful");
// 		} else {
// 			res.status(401).send("Invalid credentials");
// 		}
// 	});
// });

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
