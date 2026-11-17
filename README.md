# CrunchTime

A habit-tracking mobile app built with **React Native (Expo)** and a **Node.js / Express** backend with a hand-rolled JWT authentication flow.

![React Native](https://img.shields.io/badge/React_Native-Expo-000020?logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)

## What's implemented

- **Registration and login** with passwords hashed using bcrypt
- **JWT access tokens (5 min) + refresh tokens**: refresh tokens are stored server-side, so logging out actually revokes them
- **Auth middleware** that protects API routes
- **Token persistence** on the device with AsyncStorage
- **Navigation** split into an auth stack (splash → login/register) and a main app with bottom tabs (home, new habit, profile)

The habit screens themselves are still placeholders. This project focused on getting a secure auth flow right first.

## Tech stack

| Part     | Technology |
|----------|------------|
| Mobile   | React Native 0.72, Expo 49, React Navigation (stack + bottom tabs), AsyncStorage |
| Backend  | Node.js, Express 5, jsonwebtoken, bcrypt, mysql2 |
| Database | MySQL |

## Project structure

```
Backend/
├── authentication.js   Auth server: register, login, refresh token, logout
├── app.js              API server
├── middleware.js       JWT access-token validation
├── database.js         MySQL queries (connection pool, parameterised queries)
└── schema.sql          Database tables
Frontend/
├── Navigation/         Auth and main navigators
├── Screens/            Auth and main screens
├── api.js              API client
└── constants/, styles/ Theme, colours, shared styles
```

## Running locally

**Prerequisites:** Node 18+, MySQL, and the Expo Go app on your phone (or an emulator).

```bash
# 1. Database
mysql -u root -p -e "CREATE DATABASE crunchtime"
mysql -u root -p crunchtime < Backend/schema.sql

# 2. Backend
cd Backend
cp .env.example .env        # fill in your MySQL password and two random secrets
npm install
node authentication.js      # auth server on PORT_AUTH (default 9090)

# 3. App
cd ../Frontend
cp .env.example .env        # point EXPO_PUBLIC_API_URL at your machine's local IP
npm install
npx expo start
```
