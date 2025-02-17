const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const facultyRoutes = require("./routes/faculty.routes");
const ConnectDB = require("./config/db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors()); // Enables CORS

// Manually setting CORS headers (optional if using cors middleware)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Routes
app.use("/", facultyRoutes);

// Start the server
app.listen(PORT, async () => {
  // Uncomment and ensure ConnectDB function works
  await ConnectDB(); // Connect to MongoDB
  console.log(`Server Running on port ${PORT}`);
});
