// Importing the Express module
const express = require("express");
// Creating an Express application instance
const app = express();
// Importing the CORS module for enabling Cross-Origin Resource Sharing
const cors = require("cors");
// Importing the dotenv module for loading environment variables from a .env file
const dotenv = require("dotenv");
// Importing the quizRouter module for handling quiz-related routes
const quizrouter = require("./Routers/quizRouter");

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());
// Middleware to enable CORS for all routes
app.use(cors());
// Loading environment variables from a .env file into process.env
dotenv.config();
// Mounting the quizRouter to handle routes starting with '/v1/api'
app.use("/v1/api", quizrouter);

// Extracting the port number from environment variables
const PORT = process.env.PORT;

// Starting the server, listening on the specified port
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});