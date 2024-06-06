const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/add-user", (req, res) => {
  const newUser = req.body;

  fs.readFile("./data.json", (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile("./data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      res.status(200).send("User added successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
