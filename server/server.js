const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let users = [];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  let user = users.find((u) => u.username === username);
  if (!user) {
    user = { username, password, interests: null };
    users.push(user);
  }
  res.json({ success: true, user });
});

app.post("/api/interests", (req, res) => {
  const { username, interests } = req.body;
  let user = users.find((u) => u.username === username);
  if (user) {
    user.interests = interests;
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/api/match", (req, res) => {
  const { username } = req.query;
  let user = users.find((u) => u.username === username);
  if (user && user.interests) {
    // Dummy matching logic: if interests include "dog", it's a match
    if (user.interests.toLowerCase().includes("dog")) {
      res.json({ match: "Closest" });
    } else {
      res.json({ match: "Not Connected" });
    }
  } else {
    res.json({ match: "Not Connected" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
