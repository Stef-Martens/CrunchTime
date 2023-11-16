const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
