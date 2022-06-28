const fetchToken = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => localStorage.setItem('token', data.token))
  .catch((err) => console.log(err.message));

export default fetchToken;
