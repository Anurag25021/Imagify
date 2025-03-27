import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const {token} = req.headers;

  console.log("Received Token:", token); // Debugging

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. No Token Provided" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", tokenDecode); // Debugging

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized. Invalid Token" });
    }
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.json({ success: false, message: "Token Expired or Invalid" });
  }
};

export default userAuth;
