const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const doctorsRoute = require("./routes/doctorRoutes");
const appointmentsRoute = require("./routes/appointmentRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files from "assets" folder
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/doctors", doctorsRoute);
app.use("/appointments", appointmentsRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
