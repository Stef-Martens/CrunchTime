import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 10, // Adjust according to your needs
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function getUserOnID(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE user_id=?", [id]);
  return rows[0];
}

export async function getUserOnEmail(email) {
  const [rows] = await pool.query("SELECT * FROM user WHERE email=?", [email]);
  return rows[0];
}

export async function createUser(email, passwd, first_name, last_name) {
  const [result] = await pool.query(
    "INSERT INTO user (email, password, first_name, last_name) VALUES (?,?,?,?)",
    [email, passwd, first_name, last_name]
  );

  const id = result.insertId;
  return getUserOnID(id);
}

export async function addUserWithTokenToTable(user_id, refresh_token) {
  if ((await checkIfUserHasToken(user_id)).length == 0) {
    await pool.query(
      "INSERT INTO refresh_token (user_id, refresh_token) VALUES (?,?)",
      [user_id, refresh_token]
    );
  } else {
    await pool.query(
      "UPDATE refresh_token SET refresh_token = ? WHERE user_id=?",
      [refresh_token, user_id]
    );
  }
}

export async function checkIfUserHasToken(user_id) {
  const result = await pool.query(
    "SELECT * FROM refresh_token WHERE user_id=?",
    [user_id]
  );
  return result[0];
}

export async function checkValidityOfRefreshToken(user_id, refresh_token) {
  const record = await checkIfUserHasToken(user_id);
  if (record.refresh_token === refresh_token) {
    return true;
  }
}

export async function removeRefreshToken(user_id, token) {
  if (checkValidityOfRefreshToken(user_id, token)) {
    await pool.query("DELETE FROM refresh_token WHERE user_id=?", [user_id]);
  }
}
