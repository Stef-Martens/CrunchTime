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
import validateAccessToken from "./middleware.js";

app.use(express.json());

// USER ON ID
app.get("/users/:id", validateAccessToken, async (req, res) => {
  const id = req.params.id;
  const user = await getUserOnID(id);
  res.status(200).send(user);
});

// USER ON EMAIL
app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  const user = await getUserOnEmail(email);
  res.status(200).send(user);
});

// CREATE USER
app.post("/users/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { email, password, first_name, last_name } = req.body;
  const user = await createUser(email, hashedPassword, first_name, last_name);
  res.status(201).send(user);
});

// CRAETE NEW TOKEN
app.post("/users/token", async (req, res) => {
  const { user_id, refresh_token } = req.body;

  if (user_id == null || refresh_token == null) return res.sendStatus(401);
  if (!checkIfUserHasToken(user_id)) return res.sendStatus(403);

  await jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const rightUser = await getUserOnEmail(user.email);
      const access_token = generateAccessToken(rightUser);
      res.json({ access_token: access_token });
    }
  );
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

    res.status(201).send({ accessToken, refreshToken, user_id: user.user_id });
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
    expiresIn: "5m",
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
