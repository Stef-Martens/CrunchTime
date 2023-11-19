import express from "express";
import { getUsers, getUser, createUser } from "./database.js";
const app = express();

app.use(express.json());

// ALL USERS
app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

// USER ON ID
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const users = await getUser(id);
  res.send(users);
});

// CREATE USER
app.post("/users", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const user = await createUser(email, password, first_name, last_name);
  res.status(201).send(user);
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// PORT
app.listen(8080, () => {
  console.log("Server is running on post 8080");
});
