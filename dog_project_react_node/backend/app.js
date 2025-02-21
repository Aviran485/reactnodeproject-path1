const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const reportsRoutes = require("./routes/reports");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60 * 60 * 1000 },
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/reports", reportsRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 שרת פועל על פורט ${PORT}`));
