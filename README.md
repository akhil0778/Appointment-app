Title: Appointment Booking System

This project is a full-stack appointment booking system. Users can book, update, and cancel doctor appointments. The system has a frontend built with React and a backend using Node.js and Express with SQLite.

Steps to Set Up the Project

1. Install Node.js on your computer if not already installed.
2. Open the terminal or command prompt.
3. Navigate to the backend folder using the command:
   cd backend
4. Install backend dependencies using the command:
   npm install
5. Start the backend server using the command:
   npm start
6. Open a new terminal and navigate to the frontend folder using the command:
   cd frontend
7. Install frontend dependencies using the command:
   npm install
8. Start the frontend using the command:
   npm start
9. Open a web browser and go to:
   http://localhost:3000

How to Use the System

1. Open the website.
2. Click on the Doctors page to see available doctors.
3. Click on a doctor to view available time slots.
4. Select a date and time and book an appointment.
5. Go to the Appointments page to see booked appointments.
6. Edit or cancel appointments as needed.

API Endpoints in Backend

1. Get all doctors: GET /doctors
2. Get all appointments: GET /appointments
3. Book an appointment: POST /appointments
4. Update an appointment: PUT /appointments/:id
5. Delete an appointment: DELETE /appointments/:id

Future Improvements

1. Add user authentication.
2. Improve UI with more styles.
3. Add email notifications for appointments.

