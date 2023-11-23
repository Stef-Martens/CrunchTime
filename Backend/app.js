import express from "express";
import {
  getUsers,
  getUserOnID,
  getUserOnEmail,
  createUser,
} from "./database.js";
import bcrypt, { hash } from "bcrypt";
const app = express();
import jwt from "jsonwebtoken";

app.use(express.json());

// ALL USERS
app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

// USER ON ID
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const users = await getUserOnID(id);
  res.send(users);
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START SERVER
const PORT = process.env.PORT_APP || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
