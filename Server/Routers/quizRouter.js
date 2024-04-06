// Importing the Express module
const express = require("express");
// Creating a router object
const router = express.Router();
// Importing the quiz and submit controller functions from the quizController module
const { quiz, submit } = require("../Controllers/quizController");

// Defining routes for quiz and submit endpoints
router.get("/quiz", quiz); // GET request to '/quiz' endpoint will trigger the quiz controller function
router.post("/submit", submit); // POST request to '/submit' endpoint will trigger the submit controller function

// Exporting the router to be used in other modules
module.exports = router;
