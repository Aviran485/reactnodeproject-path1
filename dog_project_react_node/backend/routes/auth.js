const express = require("express");
const router = express.Router();
const db = require("../dbSingleton");
const bcrypt = require("bcryptjs");

// 📌 התחברות משתמש
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.query(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );
    if (users.length === 0)
      return res.status(401).json({ message: "משתמש לא נמצא" });

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "סיסמה שגויה" });

    req.session.user = { id: user.id, username: user.username };
    console.log("✅ התחברות הצליחה:", req.session.user);
    res.json({ loggedIn: true, user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת", error });
  }
});

// 📌 בדיקת סטטוס התחברות
router.get("/status", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// 📌 התנתקות משתמש
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "שגיאה בהתנתקות" });
    res.json({ message: "התנתקת בהצלחה!" });
  });
});

module.exports = router;
