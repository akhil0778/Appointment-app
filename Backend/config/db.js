const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/appointments.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Connected to SQLite database at:", dbPath);
  }
});

// Ensure tables are created immediately
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialization TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      workingHoursStart TEXT NOT NULL,
      workingHoursEnd TEXT NOT NULL
    )`,
    (err) => {
      if (err) console.error("Error creating doctors table:", err.message);
      else console.log("Doctors table created successfully.");
    }
  );

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
      if (err) console.error("Error creating appointments table:", err.message);
      else console.log("Appointments table created successfully.");
    }
  );
});

module.exports = db;
