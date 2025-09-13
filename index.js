const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Login route
app.post("/login", (req, res) => {
  const { username } = req.body;

  // Save role in cookie (bad practice!)
  if (username === "admin") {
    res.cookie("role", "admin");
    res.send("<h2>Admins cannot log in directly. Try as a normal user.</h2>");
  } else {
    res.cookie("role", "user");
    res.send(`<h2>Welcome ${username}! You are logged in as USER.</h2>
              <p>But only admins can access <a href="/admin">/admin</a></p>`);
  }
});

// Admin dashboard
app.get("/admin", (req, res) => {
  const role = req.cookies.role;

  if (role === "admin") {
    res.send(`
      <h1>Admin Dashboard</h1>
      <p>FLAG{cookie_monster_bypass}</p>
    `);
  } else {
    res.status(403).send("<h2>Access Denied! You are not an admin.</h2>");
  }
});

app.listen(PORT, () => console.log(`CTF app running on port ${PORT}`));
