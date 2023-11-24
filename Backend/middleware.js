import jwt from "jsonwebtoken";

export default function validateAccessToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  console.log(accessToken.split(" ")[1]);

  jwt.verify(
    accessToken.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid access token" });

      // Attach the user data to the request for further use
      req.user = user;

      next();
    }
  );
}
