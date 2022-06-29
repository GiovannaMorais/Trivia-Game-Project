import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
  }

  async componentDidMount() {
    const { history } = this.props;

    const { results } = await fetchGameQuestions();

    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState((prevState) => ({
      ...prevState,
      questions: [...results],
    }));
  }

  increment = () => {
    const maxLength = 4;
    this.setState((prevState) => ({
      ...prevState,
      index: prevState.index < maxLength ? prevState.index + 1 : 0,
    }));
  }

  handleAnswerClick = () => {
    const delayInSeconds = 2000;
    this.setState({ answered: true }, () => {
      setTimeout(() => {
        this.increment();
        this.setState({ answered: false });
      }, delayInSeconds);
    });
  }

  render() {
    const { index, questions, answered } = this.state;

    return (
      <>
        <Header />
        <main>
          { !!questions.length && (
            <Question
              question={ questions[index] }
              answered={ answered }
              handleClick={ this.handleAnswerClick }
            />
          )}
          <button type="button" onClick={ this.increment }>
            Next
          </button>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
