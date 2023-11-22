import express from "express";
import {
  getUsers,
  getUserOnID,
  getUserOnEmail,
  createUser,
} from "./database.js";
import bcrypt, { hash } from "bcrypt";
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
  const users = await getUserOnID(id);
  res.send(users);
});

// USER ON EMAIL
app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await getUserOnEmail(email);
  res.send(user);
});

// CREATE USER
app.post("/users/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email, password, first_name, last_name } = req.body;
  const user = await createUser(email, hashedPassword, first_name, last_name);
  res.status(201).send(user);
});

// LOGIN USER
app.post("/users/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const user = await getUserOnEmail(req.body.email);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    res.status(201).send(user);
  } else {
    res.status(401).send("Not Allowed");
  }
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
