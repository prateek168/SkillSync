import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const PythonQuiz = () => {
  const questions = [
      {
        question: "What is the output of the following code?\n\npython\nprint([i for i in range(5)])\n",
        options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3]", "[1, 2, 3, 4]"],
        answer: "[0, 1, 2, 3, 4]",
        category: "Python Basics"
      },
      {
        question: "Which of the following statements is true about Python?",
        options: [
          "Python is a low-level language.",
          "Python is a compiled language.",
          "Python is a high-level language.",
          "Python is a functional programming language."
        ],
        answer: "Python is a high-level language.",
        category: "Python Basics"
      },
      {
        question: "What is the result of the following expression?\n\npython\n3 * 'abc'\n",
        options: ["'abcabcabc'", "'abc abc abc'", "['abc', 'abc', 'abc']", "'aabbcc'"],
        answer: "'abcabcabc'",
        category: "Python Strings"
      },
      {
        question: "What will be the output of the following code?\n\npython\na = [1, 2, 3]\nb = a\na[0] = 0\nprint(b)\n",
        options: ["[1, 2, 3]", "[0, 2, 3]", "[0, 1, 2, 3]", "[0, 2, 3, 4]"],
        answer: "[0, 2, 3]",
        category: "Python Lists"
      },
      {
        question: "Which of the following is used to define a function in Python?",
        options: ["func()", "define func()", "def func()", "function func()"],
        answer: "def func()",
        category: "Python Functions"
      },
      {
        question: "What is the output of the following code?\n\npython\nx = 5\ny = x\nx += 2\nprint(y)\n",
        options: ["5", "7", "2", "None of the above"],
        answer: "5",
        category: "Python Variables"
      },
      {
        question: "What is the output of the following code?\n\npython\nprint('Hello'[::-1])\n",
        options: ["'Hello'", "'olleH'", "'H'", "'o'"],
        answer: "'olleH'",
        category: "Python Strings"
      },
      {
        question: "Which of the following is a correct way to open a file named 'example.txt' in read mode in Python?",
        options: ["file = open('example.txt', 'r')", "file = open('example.txt', 'read')", "file = open('example.txt', 'w')", "file = open('example.txt', 'rb')"],
        answer: "file = open('example.txt', 'r')",
        category: "Python File Handling"
      },
      {
        question: "What will be the output of the following code?\n\npython\nnumbers = [1, 2, 3, 4]\nprint(sum(numbers))\n",
        options: ["10", "24", "4", "None of the above"],
        answer: "10",
        category: "Python Lists"
      },
      {
        question: "Which of the following data structures is used to implement FIFO order?",
        options: ["Stack", "Queue", "Heap", "Array"],
        answer: "Queue",
        category: "Data Structures"
      }
    ];

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const jobId = searchParams.get('jobId');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [timer, setTimer] = useState(300);
    const [isAttempted, setIsAttempted] = useState(false);
    const navigate = useNavigate();
  
    const isAttemptedRef = useRef(isAttempted);
  
    useEffect(() => {
      isAttemptedRef.current = isAttempted;
    }, [isAttempted]);
  
    //check tab change
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          alert('Test ended due to tab change.');
          navigate('/testended');
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
  
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [navigate]);
  
    //timer for the test (5min)
    useEffect(() => {
      const countdown = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 0) {
            clearInterval(countdown);
            alert('Time is up! You will be redirected to the login page.');
            navigate('/login');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  
      return () => clearInterval(countdown);
    }, [navigate]);
  
    //when user changes the option for a question
    const handleOptionChange = (option) => {
      setUserAnswer(option);
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentIndex]: option
      }));
    };
  
    //when user clicks on next or submit
    const handleSubmit = () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer(userAnswers[currentIndex + 1] || '');
      } else {
        evaluateQuiz();
      }
    };
  
    //after submission evaluate the quiz result and update the marks to the database
    const evaluateQuiz = async () => {
      const totalScore = questions.reduce((acc, question, index) => {
        return acc + (userAnswers[index] === question.answer ? 1 : 0);
      }, 0);
      setScore(totalScore);
  
      const { error } = await supabase
        .from('job_applications')
        .update({ test_score: totalScore })
        .eq('user_id', id)
        .eq('job_id', jobId);
  
      if (error) {
        console.error('Error updating job application:', error);
      } else {
        alert('Quiz completed. Your score has been recorded.');
        navigate('/scoreRecorded');
      }
    };
  
    //check if the user has already attempted the test
    const checkAttempted = async () => {
      try {
        const { data: jobApplications, error } = await supabase
            .from('job_applications')
            .select('test_attempted')
            .eq('user_id', id)
            .eq('job_id', jobId);
  
        if (error) {
          console.error('Error fetching job applications:', error.message);
        } else {
          if (jobApplications.length > 0) {
            return jobApplications[0].test_attempted;
          }
        }
      } catch (error) {
        console.error('Error fetching job applications:', error.message);
      }
    }
  
    //set the test_attempted flag to true
    const setAttempted = async () => {
      try {
        const { data: jobApplications, error } = await supabase
            .from('job_applications')
            .update({ test_attempted: true })
            .eq('user_id', id)
            .eq('job_id', jobId);
  
        setIsAttempted(true);
      } catch (error) {
        console.error('Error updating job application:', error.message);
      }
    };
  
    //check if the end date of the test has passed
    const checkEndDate = async () => {
      try {
        const { data: jobData, error } = await supabase
          .from('jobs')
          .select('test_end_date')
          .eq('id', jobId)
          .single();
    
        if (error) {
          console.error('Error fetching job data:', error.message);
          return false;
        } else {
          const { test_end_date } = jobData;
          const currentDate = new Date().toISOString().split('T')[0];
    
          if (test_end_date && test_end_date <= currentDate) {
            alert('Test cannot be taken as the end date has passed.');
            navigate('/testended');
            return true;
          }
          return false;
        }
      } catch (error) {
        console.error('Error fetching job data:', error.message);
        return false;
      }
    };
    
    //overall checking the test conditions
    useEffect(() => {
      const fetchData = async () => {
        if (!isAttemptedRef.current) {
          const endDatePassed = await checkEndDate();
          if (endDatePassed) return;
    
          const attempted = await checkAttempted();
          if (attempted) {
            setIsAttempted(true);
            alert('You have already attempted the test.');
            navigate('/testended');
          } else {
            await setAttempted();
          }
        }
      };
      fetchData();
    }, [id, jobId, navigate, isAttemptedRef]);

    
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
                <div key={index} className="option mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={userAnswer === option}
                      onChange={() => handleOptionChange(option)}
                      className="mr-2 "
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="controls flex justify-between items-center mt-4">
            <div className="timer bg-red-200 text-red-800 p-2 rounded-lg">
              Time Left: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
            </div>
            <button
              onClick={handleSubmit}
              className="next-btn bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PythonQuiz;

