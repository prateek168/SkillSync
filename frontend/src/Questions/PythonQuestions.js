export const questions = [
    {
      question: "What is the output of the following code?\n\npython\nprint([i for i in range(5)])\n",
      options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3]", "[1, 2, 3, 4]"],
      answer: "[0, 1, 2, 3, 4]"
    },
    {
      question: "Which of the following statements is true about Python?",
      options: [
        "Python is a low-level language.",
        "Python is a compiled language.",
        "Python is a high-level language.",
        "Python is a functional programming language."
      ],
      answer: "Python is a high-level language."
    },
    {
      question: "What is the result of the following expression?\n\n```python\n3 * 'abc'\n```",
      options: ["'abcabcabc'", "'abc abc abc'", "['abc', 'abc', 'abc']", "'aabbcc'"],
      answer: "'abcabcabc'"
    },
    {
      question: "What will be the output of the following code?\n\n```python\na = [1, 2, 3]\nb = a\na[0] = 0\nprint(b)\n```",
      options: ["[1, 2, 3]", "[0, 2, 3]", "[0, 1, 2, 3]", "[0, 2, 3, 4]"],
      answer: "[0, 2, 3]"
    },
    {
      question: "Which of the following is used to define a function in Python?",
      options: ["func()", "define func()", "def func()", "function func()"],
      answer: "def func()"
    },
    {
      question: "What is the output of the following code?\n\n```python\nx = 5\ny = x\nx += 2\nprint(y)\n```",
      options: ["5", "7", "2", "None of the above"],
      answer: "5"
    },
    {
      question: "What is the output of the following code?\n\n```python\nprint('Hello'[::-1])\n```",
      options: ["'Hello'", "'olleH'", "'H'", "'o'"],
      answer: "'olleH'"
    },
    {
      question: "Which of the following is a correct way to open a file named 'example.txt' in read mode in Python?",
      options: ["file = open('example.txt', 'r')", "file = open('example.txt', 'read')", "file = open('example.txt', 'w')", "file = open('example.txt', 'rb')"],
      answer: "file = open('example.txt', 'r')"
    },
    {
      question: "What will be the output of the following code?\n\n```python\nnumbers = [1, 2, 3, 4]\nprint(sum(numbers))\n```",
      options: ["10", "24", "4", "None of the above"],
      answer: "10"
    },
    {
      question: "Which of the following data structures is used to implement FIFO order?",
      options: ["Stack", "Queue", "Heap", "Array"],
      answer: "Queue"
    }  
  ];
  