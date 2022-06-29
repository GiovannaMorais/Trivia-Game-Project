import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import sortQuestions from '../utils/sortQuestions';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
    timer: 30,
    nextButtonDisabled: true,
  }

  async componentDidMount() {
    const { history } = this.props;

    const { results } = await fetchGameQuestions();

    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    const resultsSorted = results.map(sortQuestions);

    this.setState((prevState) => ({
      ...prevState,
      questions: [...resultsSorted],
    }));

    this.timerCounter();
  }

  componentDidUpdate() {
    const { timer, nextButtonDisabled, intervalId } = this.state;

    if (timer === 0 && nextButtonDisabled) {
      this.setState({ nextButtonDisabled: false });
    }

    if (timer === 0) clearInterval(intervalId);
  }

  timerCounter = () => {
    const { timer } = this.state;
    const delayInMiliseconds = 1000;

    if (timer > 0) {
      const intervalId = setInterval(() => {
        this.setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
          intervalId,
        }));
      }, delayInMiliseconds);
    }
  }

  increment = () => {
    const maxLength = 4;
    this.setState((prevState) => ({
      ...prevState,
      index: prevState.index < maxLength ? prevState.index + 1 : 0,
      answered: false,
      timer: 30,
      nextButtonDisabled: true,
    }), () => this.timerCounter());
  }

  handleAnswerClick = () => {
    this.setState({
      answered: true,
      nextButtonDisabled: false,
    });
  }

  render() {
    const { index, questions, answered, timer, nextButtonDisabled } = this.state;

    return (
      <>
        <Header />
        <main>
          { !!questions.length && (
            <Question
              question={ questions[index] }
              answered={ answered }
              handleClick={ this.handleAnswerClick }
              isDisabled={ !nextButtonDisabled }
            />
          )}
          <h1>{timer}</h1>
          {
            answered && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.increment }
                disabled={ nextButtonDisabled }
              >
                Next
              </button>
            )
          }
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
