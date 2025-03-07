require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { rateLimit } = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// database
const { dbConnectionHandler } = require("./utils/connection_db");

// routes imports
const authRouteHandler = require("./routes/auth");
const articleRouteHandler = require("./routes/article");
const categoryRouteHandler = require("./routes/category");
const usersRoutesHandler = require("./routes/users");
const showcasesRouteHandler = require("./routes/showcases");
const dashboardMetrics = require("./routes/dashmetrics");
const newsletterRouteHandler = require("./routes/newsletter");

// configs
const server = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  validate: { xForwardedForHeader: false },
});
// cors cofig
const acceptableDomains = [
  "https://fynewave.com",
  "https://admin.fynewave.com",
  "https://www.admin.fynewave.com",
  "https://www.fynewave.com",
];
let corsOption = {
  origin: function (origin, callback) {
    if (origin === undefined) {
      callback(null, true);
    } 
    else if (acceptableDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Forbidden"),false);
    }
  },
};

// helmet config
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
  frameguard: { action: "deny" },
  xssFilter: true,
};


// middlewares
server.options('*', cors(corsOption));
server.use(cors(corsOption));
server.use(helmet(helmetConfig));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(logger("dev"));
server.use(limiter);
server.use(mongoSanitize());

// routes listings
server.use("/api/auth", authRouteHandler);
server.use("/api/article", articleRouteHandler);
server.use("/api/category", categoryRouteHandler);
server.use("/api/users", usersRoutesHandler);
server.use("/api/showcases", showcasesRouteHandler);
server.use("/api/dash-metrics", dashboardMetrics);
server.use("/api/newsletter", newsletterRouteHandler);

// Global error handler for CORS rejection
server.use((err, req, res, next) => {
  if (err && err.message === "Forbidden") {
    console.log("req from unknown");
    return res.status(403).json({ error: "Forbidden: Origin not allowed" });
  }
  next(err);
});

// listner $ connection
const lisenAndConnection = async () => {
  try {
    await dbConnectionHandler();
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
lisenAndConnection();
