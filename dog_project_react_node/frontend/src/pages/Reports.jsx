import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 שליפת הדיווחים מהשרת (Session-Based)
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports", {
        withCredentials: true, // ✅ שולח את ה-Session עם הבקשה
      });

      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ שגיאה בשליפת דיווחים:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 📌 מחיקת דיווח ללא רענון הדף
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/delete/${id}`, {
        withCredentials: true, // ✅ שולח את ה-Session עם הבקשה
      });

      console.log("✅ דיווח נמחק בהצלחה");
      fetchReports(); // טוען מחדש את הנתונים
    } catch (error) {
      console.error("❌ שגיאה במחיקה:", error);
    }
  };

  // 📌 עדכון סטטוס ללא רענון הדף
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reports/update/${id}`,
        { status: newStatus },
        { withCredentials: true } // ✅ שולח את ה-Session עם הבקשה
      );

      console.log("✅ סטטוס עודכן בהצלחה");
      fetchReports(); // טוען מחדש את הנתונים
    } catch (error) {
      console.error("❌ שגיאה בעדכון הסטטוס:", error);
    }
  };

  return (
    <div className="reports-container">
      <h1>📋 ניהול דיווחים</h1>
      {loading ? (
        <p>⏳ טוען נתונים...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>תמונה</th>
              <th>תיאור</th>
              <th>מיקום</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  {report.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${report.image}`}
                      alt="Report"
                      width="80"
                    />
                  ) : (
                    "אין תמונה"
                  )}
                </td>
                <td>{report.description}</td>
                <td>{report.location}</td>
                <td>
                  <select
                    value={report.status}
                    onChange={(e) =>
                      handleUpdateStatus(report.id, e.target.value)
                    }
                  >
                    <option value="לא טופל">לא טופל</option>
                    <option value="בטיפול">בטיפול</option>
                    <option value="נסגר">נסגר</option>
                  </select>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(report.id)}
                  >
                    ❌ מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
