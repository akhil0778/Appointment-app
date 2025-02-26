const db = require("../config/db");

// Create Appointments Table
db.run(
  `CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    patientName TEXT NOT NULL,
    patientEmail TEXT NOT NULL,
    FOREIGN KEY (doctorId) REFERENCES doctors(id)
  )`,
  (err) => {
    if (err) console.error("❌ Error creating appointments table:", err.message);
    else console.log("✅ Appointments table created successfully.");
  }
);

module.exports = db;
