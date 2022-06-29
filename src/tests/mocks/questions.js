export const successQuestionMock = {
  response_code: 0,
  results: [
    {
      category: "Mythology",
      type: "multiple",
      difficulty: "medium",
      question:
        "This Greek mythological figure is the god/goddess of battle strategy (among other things).",
      correct_answer: "Athena",
      incorrect_answers: ["Ares", "Artemis", "Apollo"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question:
        "In Need For Speed Most Wanted (2005), what do you drive at the beginning of the career mode?",
      correct_answer: "BMW M3 GTR",
      incorrect_answers: ["Porsche 911 Turbo", "Nissan 240SX", "Ford Mustang"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question:
        "In &quot;Jurassic World&quot;, what is the name of the dinosaur that is a genetic hybrid?",
      correct_answer: "Indominus Rex",
      incorrect_answers: ["Mosasaurus", "Pteranodon", "Tyrannosaurus Rex"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "The Python programming language gets its name from the British comedy group &quot;Monty Python.&quot;",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "Entertainment: Music",
      type: "multiple",
      difficulty: "hard",
      question:
        "What year did Dire Straits&#039;s Song &quot;Money for Nothing&quot; release?",
      correct_answer: "1985",
      incorrect_answers: ["1973", "1980", "1991"],
    },
  ],
};

export const failedQuestionMock = {
  response_code: 3,
  results: [],
}
