import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.redirect('/') }
        >
          Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
