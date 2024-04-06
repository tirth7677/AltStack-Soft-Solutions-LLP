// Importing questions data from a JSON file
const questions = require("../Data/Questions.json");

// Controller function to handle quiz request
const quiz = async (req, res) => {
  // Respond with the questions data in JSON format
  res.json(questions);
};

// Controller function to handle quiz submission
const submit = async (req, res) => {
  // Extract user's answers from the request body (assuming it's an array of answer indices)
  const userAnswers = req.body;
  let score = 0;
  const feedback = [];

  // Compare user's answers with correct answers and provide feedback
  userAnswers.forEach((userAnswer, index) => {
    const question = questions[index];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      // If answer is correct, increment the score and provide correct feedback
      score++;
      feedback.push({
        question: question.question,
        answer: userAnswer,
        correct: true,
      });
    } else {
      // If answer is incorrect, provide correct answer and mark it as incorrect
      feedback.push({
        question: question.question,
        answer: userAnswer,
        correct: false,
        correctAnswer: question.options[question.correctAnswer],
      });
    }
  });

  // Calculate percentage score
  const percentageScore = (score / questions.length) * 100;

  // Provide overall feedback to the user including score, number of correct/incorrect answers, and detailed feedback for each question
  const overallFeedback = {
    score: percentageScore,
    totalQuestions: questions.length,
    correctAnswers: score,
    incorrectAnswers: questions.length - score,
    feedback: feedback,
  };

  // Respond with overall feedback in JSON format
  res.json(overallFeedback);
};

// Exporting the quiz and submit functions for use in other modules
module.exports = { quiz, submit };
