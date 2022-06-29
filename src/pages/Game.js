import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchGameQuestions from '../services/fetchGameQuestions';
import sortQuestions from '../utils/sortQuestions';
import Question from '../components/Question';
import Header from '../components/Header';
import { sendUserGameInfo } from '../redux/actions/actions';

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

    if (timer === 0) clearInterval(intervalId);

    if (timer === 0 && nextButtonDisabled) {
      this.setState({ nextButtonDisabled: false });
    }
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
    const {
      history,
      player,
    } = this.props;
    const { intervalId, index } = this.state;
    clearInterval(intervalId);
    this.setState((prevState) => ({
      ...prevState,
      index: prevState.index < maxLength ? prevState.index + 1 : 0,
      answered: false,
      timer: 30,
      nextButtonDisabled: true,
    }), () => this.timerCounter());

    if (index === maxLength) {
      history.push('/feedback');

      if (!localStorage.getItem('ranking')) {
        localStorage.setItem('ranking', JSON.stringify([player]));
      } else {
        const ranking = JSON.parse(localStorage.getItem('ranking'));
        localStorage.setItem('ranking', JSON.stringify([...ranking, player]));
      }
    }
  };

  setPoints = (points, assertions) => {
    const { sendGameInfo } = this.props;
    sendGameInfo(points, assertions);
  }

  handleAnswerClick = ({ points, assertions }) => {
    this.setState({
      answered: true,
      nextButtonDisabled: false,
    });

    this.setPoints(points, assertions);
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
              timer={ timer }
            />
          )}
          <h1>{timer}</h1>
          {
            answered && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.increment }
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

const mapDispatchToProps = (dispatch) => ({
  sendGameInfo: (score, assertions) => dispatch(sendUserGameInfo(score, assertions)),
});

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  sendGameInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
