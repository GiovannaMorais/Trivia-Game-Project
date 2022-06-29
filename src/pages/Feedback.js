import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  toggleFeedbackText(assertions) {
    const minAssertionsQuantity = 3;

    if (assertions < minAssertionsQuantity) {
      return 'Could be better...';
    }

    return 'Well Done!';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          { this.toggleFeedbackText(assertions) }
        </h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.redirect('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.redirect('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
