const db = require("../config/db");

// Function to insert new doctor records
const insertDoctors = () => {
  db.serialize(() => {
    // Step 1: Delete existing doctors and confirm deletion
    db.run("DELETE FROM doctors", function (err) {
      if (err) {
        console.error("❌ Error deleting old doctor records:", err.message);
        return;
      }
      console.log(`✅ Deleted ${this.changes} old doctor records.`);

      // Step 2: Reset the auto-increment ID sequence
      db.run("DELETE FROM sqlite_sequence WHERE name='doctors'", (err) => {
        if (err) {
          console.error("❌ Error resetting ID sequence:", err.message);
          return;
        }
        console.log("✅ ID sequence reset.");

        // Step 3: Prepare and insert new doctor data
        const doctors = [
          {
            name: "Dr. Alice Johnson",
            specialization: "Obstetrics & Gynecology",
            description:
              "Experienced in prenatal and postnatal care. Passionate about women's health.",
            image: "/assets/doctors/alice.png",
            workingHoursStart: "09:00",
            workingHoursEnd: "17:00",
          },
          {
            name: "Dr. John Smith",
            specialization: "Maternal-Fetal Medicine",
            description: "Expert in high-risk pregnancies and fetal care.",
            image: "/assets/doctors/john.png",
            workingHoursStart: "09:00",
            workingHoursEnd: "17:00",
          },
        ];

        const stmt = db.prepare(
          `INSERT INTO doctors (name, specialization, description, image, workingHoursStart, workingHoursEnd) 
           VALUES (?, ?, ?, ?, ?, ?)`
        );

        doctors.forEach((doctor, index) => {
          stmt.run(
            doctor.name,
            doctor.specialization,
            doctor.description,
            doctor.image,
            doctor.workingHoursStart,
            doctor.workingHoursEnd,
            function (err) {
              if (err) {
                console.error(`❌ Error inserting doctor ${doctor.name}:`, err.message);
              } else {
                console.log(`✅ Inserted doctor ${doctor.name} with ID: ${this.lastID}`);
              }
            }
          );
        });

        stmt.finalize(() => {
          console.log("✅ New doctor records inserted successfully.");
        });
      });
    });
  });
};

// Run the function once to insert doctors when the server starts
insertDoctors();

module.exports = db;
