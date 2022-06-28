function fetchGameQuestions() {
  const baseQuestionsApiUrl = 'https://opentdb.com/api.php?amount=5&token=';
  const userToken = localStorage.getItem('token');

  return fetch(`${baseQuestionsApiUrl}${userToken}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

export default fetchGameQuestions;
