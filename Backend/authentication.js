import express from "express";
import {
  getUsers,
  getUserOnID,
  getUserOnEmail,
  createUser,
  addUserWithTokenToTable,
  removeRefreshToken,
  checkIfUserHasToken,
} from "./database.js";
import bcrypt, { hash } from "bcrypt";
const app = express();
import jwt from "jsonwebtoken";

app.use(express.json());

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

// CRAETE NEW TOKEN
// SAVE REFRESHTOKEN INSIDE OF APP => ook in databank blijkbaar?
app.post("/users/token", async (req, res) => {
  const { user_id, token } = req.body;

  if (user_id == null || token == null) return res.sendStatus(401);
  if (!checkIfUserHasToken(user_id)) return res.sendStatus(403);

  await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
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
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    await addUserWithTokenToTable(user.user_id, refreshToken);

    res.status(201).send({ accessToken, refreshToken, user });
  } else {
    res.status(401).send("Not Allowed");
  }
});

// DELETE TOKEN
// LOGOUT
app.delete("/users/logout", async (req, res) => {
  const { user_id, token } = req.body;
  await removeRefreshToken(user_id, token);

  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign({ user: user.user_id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// START SERVER
const PORT = process.env.PORT_AUTH || 9090;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
