import jwt from "jsonwebtoken";


  export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log(decoded);

    req.user = decoded.userId;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};