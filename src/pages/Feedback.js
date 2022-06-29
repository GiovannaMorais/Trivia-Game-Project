import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  toggleFeedbackText(assertions) {
    const minAssertionsQuantity = 3;

    if (assertions < minAssertionsQuantity) {
      return 'Could be better...';
    }

    return 'Well Done!';
  }

  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          { this.toggleFeedbackText(assertions) }
        </h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
