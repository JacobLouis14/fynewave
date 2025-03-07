const jwt = require("jsonwebtoken");

const checkIsAuthorized = async (req, res, next) => {
  try {
    // check there is headers
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization;

    // check the token starts with bearer
    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = token.split(" ")[1];

    //   verify the token and extract data
    jwt.verify(accessToken, process.env.JWTSECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized", err });
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};

const checkIsAdmin = (req, res, next) => {
  try {
    // check if user in req
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access to admin only" });
    }

    // check is admin
    if (req.user.userRole !== 0) {
      return res
        .status(401)
        .json({ message: "Unauthorized access to admin only" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access to admin only" });
  }
};

module.exports = {
  checkIsAuthorized,
  checkIsAdmin,
};
