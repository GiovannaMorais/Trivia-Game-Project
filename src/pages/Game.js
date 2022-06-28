import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchGameQuestions from '../services/fetchGameQuestions';
import Question from '../components/Question';

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

    const { gravatarEmail, userName } = this.props;

    const gravatarBaseUrl = 'https://www.gravatar.com/avatar/';
    const userEmailToHash = md5(gravatarEmail).toString();

    return (
      <>
        <header>
          <img
            src={ `${gravatarBaseUrl}${userEmailToHash}` }
            alt={ `${userName}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="header-score">0</p>
        </header>
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

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  userName: state.player.name,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
