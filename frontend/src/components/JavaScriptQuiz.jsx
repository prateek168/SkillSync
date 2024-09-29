import React, { useState, useEffect } from 'react';

const JavaScriptQuizApp = () => {
  const questions = [
    {
      question: "What is the output of the following code?\n\n```javascript\nconsole.log([...'hello'])\n```",
      options: ["['h', 'e', 'l', 'l', 'o']", "['hello']", "['h', 'e', 'l', 'l']", "['H', 'E', 'L', 'L', 'O']"],
      answer: "['h', 'e', 'l', 'l', 'o']",
      category: "JavaScript Basics"
    },
    {
      question: "Which of the following is a correct way to declare a variable in JavaScript?",
      options: ["var myVar;", "let myVar;", "const myVar;", "All of the above"],
      answer: "All of the above",
      category: "JavaScript Variables"
    },
    {
      question: "What is the output of the following code?\n\n```javascript\nconsole.log(typeof NaN);\n```",
      options: ["'number'", "'string'", "'object'", "'undefined'"],
      answer: "'number'",
      category: "JavaScript Types"
    },
    {
      question: "What is the output of the following code?\n\n```javascript\nlet a = [1, 2, 3];\nlet b = a;\na[0] = 0;\nconsole.log(b);\n```",
      options: ["[1, 2, 3]", "[0, 2, 3]", "[0, 1, 2, 3]", "[0, 2, 3, 4]"],
      answer: "[0, 2, 3]",
      category: "JavaScript Arrays"
    },
    {
      question: "Which of the following is used to define a function in JavaScript?",
      options: ["function myFunc()", "define myFunc()", "def myFunc()", "function:myFunc()"],
      answer: "function myFunc()",
      category: "JavaScript Functions"
    },
    {
      question: "What is the output of the following code?\n\n```javascript\nlet x = 5;\nlet y = x;\nx += 2;\nconsole.log(y);\n```",
      options: ["5", "7", "2", "None of the above"],
      answer: "5",
      category: "JavaScript Variables"
    },
    {
      question: "What is the output of the following code?\n\n```javascript\nconsole.log('Hello'.split('').reverse().join(''));\n```",
      options: ["'Hello'", "'olleH'", "'H'", "'o'"],
      answer: "'olleH'",
      category: "JavaScript Strings"
    },
    {
      question: "Which of the following is a correct way to open a file named 'example.txt' in read mode in Node.js?",
      options: ["fs.open('example.txt', 'r')", "fs.read('example.txt', 'r')", "fs.open('example.txt', 'read')", "fs.read('example.txt', 'read')"],
      answer: "fs.open('example.txt', 'r')",
      category: "Node.js File Handling"
    },
    {
      question: "What will be the output of the following code?\n\n```javascript\nlet numbers = [1, 2, 3, 4];\nconsole.log(numbers.reduce((a, b) => a + b));\n```",
      options: ["10", "24", "4", "None of the above"],
      answer: "10",
      category: "JavaScript Arrays"
    },
    {
      question: "Which of the following data structures is used to implement FIFO order?",
      options: ["Stack", "Queue", "Heap", "Array"],
      answer: "Queue",
      category: "Data Structures"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOptionChange = (option) => {
    setUserAnswer(option);
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentIndex]: option
    }));
  };

  const handleSubmit = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer(userAnswers[currentIndex + 1] || '');
    } else {
      evaluateQuiz();
    }
  };

  const evaluateQuiz = () => {
    const totalScore = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
    setScore(totalScore);
  };

  return (
    <div className="quiz-app bg-white border-4 border-gray-200 p-4 rounded-2xl max-w-3xl mx-auto mt-10 shadow-lg">
      <div className="quiz-info flex justify-between p-4 bg-gray-100 rounded-2xl mb-4">
        <div className="category">
          Category: <span>{questions[currentIndex]?.category}</span>
        </div>
        <div className="count">
          Questions Count: <span>{questions.length}</span>
        </div>
      </div>

      {questions.length > 0 && (
        <>
          <div className="quiz-area bg-white p-4 mb-4 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4">{questions[currentIndex]?.question}</h2>
            <div className="options-area">
              {questions[currentIndex]?.options.map((option, index) => (
                <div key={index} className="option bg-gray-100 p-4 mb-2 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      value={option}
                      checked={userAnswer === option}
                      onChange={() => handleOptionChange(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="submit-button bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Submit Answer
          </button>

          <div className="bullets flex justify-between items-center p-4 bg-gray-100 rounded-2xl mt-4">
            <div className="spans flex">
              {questions.map((_, index) => (
                <span
                  key={index}
                  className={`w-4 h-4 rounded-full mr-2 ${index <= currentIndex ? 'bg-blue-500' : 'bg-white border'}`}
                ></span>
              ))}
            </div>
            <div className="countdown font-bold text-lg">{`${Math.floor(timer / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}</div>
          </div>
        </>
      )}

      {score !== null && (
        <div className="results text-center font-bold text-2xl mt-4">
          Your Score: <span className={score === questions.length ? 'text-yellow-500' : score > questions.length / 2 ? 'text-green-500' : 'text-red-500'}>{score}/{questions.length}</span>
        </div>
      )}
    </div>
  );
};

export default JavaScriptQuizApp;
