// Fetching quiz questions from the server
fetch('http://localhost:3000/v1/api/quiz')
    .then(response => response.json())
    .then(questions => {
        // Get the quiz form element
        const form = document.getElementById('quizForm');
        // Iterate through each question received
        questions.forEach((question, index) => {
            // Create a div element for each question
            const questionElement = document.createElement('div');
            // Populate the div with question and options
            questionElement.innerHTML = `
                <h3>${index + 1}. ${question.question}</h3>
                <ul>
                    ${question.options.map((option, optionIndex) => `
                        <li>
                            <input type="radio" name="question${index}" value="${optionIndex}" required>
                            <label>${option}</label>
                        </li>
                    `).join('')}
                </ul>
                <p id="feedback${index}"></p>
            `;
            // Insert the question div before the last element of the form
            form.insertBefore(questionElement, form.lastElementChild);
        });
    });

// Adding event listener for form submission
document.getElementById('quizForm').addEventListener('submit', (event) => {
    // Prevent default form submission behavior
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);

    const answers = [];
    // Extract answers from form data
    for (const pair of formData.entries()) {
        answers.push(parseInt(pair[1]));
    }

    // Submit answers to the server
    fetch('http://localhost:3000/v1/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
        .then(response => response.json())
        .then(feedback => {
            // Process feedback from the server
            feedback.feedback.forEach((item, index) => {
                const feedbackElement = document.getElementById(`feedback${index}`);
                if (item.correct) {
                    // If answer is correct, display "Correct"
                    feedbackElement.textContent = "Correct";
                    feedbackElement.classList.add('correct'); // Add 'correct' class for correct answers
                    feedbackElement.classList.remove('incorrect'); // Remove 'incorrect' class if present
                } else {
                    // If answer is incorrect, display correct answer
                    feedbackElement.textContent = `Incorrect. Correct answer: ${item.correctAnswer}`;
                    feedbackElement.classList.add('incorrect'); // Add 'incorrect' class for incorrect answers
                    feedbackElement.classList.remove('correct'); // Remove 'correct' class if present
                }
            });

            // Display score and number of correct/incorrect answers
            alert(`Your score: ${feedback.score.toFixed(2)}%\nCorrect Answers: ${feedback.correctAnswers}\nIncorrect Answers: ${feedback.incorrectAnswers}`);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});
