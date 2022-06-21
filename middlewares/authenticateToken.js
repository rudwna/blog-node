import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, req.app.locals.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
  next();
}

export default authenticateToken;
