const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Get All Doctors
router.get("/", (req, res) => {
  db.all("SELECT * FROM doctors", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get Single Doctor by ID
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM doctors WHERE id = ?", [req.params.id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(row || { message: "Doctor not found" });
  });
});

router.get("/:id/slots", (req, res) => {
  const doctorId = req.params.id;
  const date = req.query.date; // YYYY-MM-DD format

  if (!date) {
    return res.status(400).json({ error: "Date is required in YYYY-MM-DD format" });
  }

  const allSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    const slot = `${hour}:00 - ${hour + 1}:00`;
    allSlots.push(slot);
  }

  console.log("🔹 All possible slots:", allSlots);

  db.all(
    "SELECT timeSlot FROM appointments WHERE doctorId = ? AND date = ?",
    [doctorId, date],
    (err, rows) => {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      const bookedSlots = rows.map(row => row.timeSlot);
      console.log("🔹 Booked slots from DB:", bookedSlots);

      const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
      console.log("✅ Available slots:", availableSlots);

      res.json(availableSlots.length ? availableSlots : ["No available slots"]);
    }
  );
});



module.exports = router;
