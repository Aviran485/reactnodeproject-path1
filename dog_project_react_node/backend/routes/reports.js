const express = require("express");
const router = express.Router();
const db = require("../dbSingleton");
const multer = require("multer");
const path = require("path");

// 📌 Middleware לבדיקה אם המשתמש מחובר (Session-Based)
const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "גישה נדחתה - יש להתחבר" });
  }
  next();
};

// 📌 אחסון תמונות
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

// 📌 שליפת כל הדיווחים (לעובדים מחוברים בלבד)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [reports] = await db.query("SELECT * FROM reports");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "❌ שגיאת שרת", error });
  }
});

// 📌 הוספת דיווח חדש (משתמשים אנונימיים יכולים לדווח)
router.post("/add", upload.single("image"), async (req, res) => {
  let { description, location } = req.body;
  const image = req.file ? req.file.filename : null;
  const user_id = req.session.user ? req.session.user.id : null;

  try {
    await db.query(
      "INSERT INTO reports (user_id, image, description, location, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, image, description, location, "לא טופל"]
    );
    res.status(201).json({ message: "✅ דיווח נוסף בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "❌ שגיאת שרת", error });
  }
});

// 📌 עדכון סטטוס דיווח (לעובדים בלבד)
router.put("/update/:id", authMiddleware, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "UPDATE reports SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ דיווח לא נמצא" });
    }

    res.json({ message: "✅ סטטוס עודכן בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "❌ שגיאת שרת", error });
  }
});

// 📌 מחיקת דיווח (לעובדים בלבד)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM reports WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "❌ דיווח לא נמצא" });
    }

    res.json({ message: "✅ הדיווח נמחק בהצלחה" });
  } catch (error) {
    res.status(500).json({ message: "❌ שגיאת שרת", error });
  }
});

module.exports = router;
