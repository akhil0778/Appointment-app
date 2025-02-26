const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Fetch all appointments
router.get("/", (req, res) => {
  db.all("SELECT * FROM appointments", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Update an existing appointment (only time and date should be updated)
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  db.run(
    `UPDATE appointments SET date = ?, time = ? WHERE id = ?`,
    [date, time, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Appointment not found." });
      }
      res.json({ message: "Appointment updated successfully!" });
    }
  );
});

// Delete an appointment
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM appointments WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Appointment not found." });
    }
    res.json({ message: "Appointment canceled successfully!" });
  });
});

// Book an Appointment (with 30-minute slot restriction)
router.post("/", (req, res) => {
  const { doctorId, date, time, patientName, patientEmail } = req.body;

  console.log("Received appointment data:", req.body); // ✅ Check if `date` is received

  if (!date || !time || !doctorId || !patientName) {
    return res.status(400).json({ error: "All fields (doctorId, date, time, patientName) are required" });
  }

  db.run(
    `INSERT INTO appointments (doctorId, date, time, patientName, patientEmail) 
     VALUES (?, ?, ?, ?, ?)`,
    [doctorId, date, time, patientName, patientEmail],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        id: this.lastID,
        message: "Appointment booked successfully!",
      });
    }
  );
});

module.exports = router;
