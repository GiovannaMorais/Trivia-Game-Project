function sortQuestions(question) {
  const shuffle = 0.5;

  const sortedAnswers = [...question?.incorrect_answers, question?.correct_answer]
    .sort(() => shuffle - Math.random());

  return ({
    ...question,
    sortedAnswers,
  });
}

export default sortQuestions;
