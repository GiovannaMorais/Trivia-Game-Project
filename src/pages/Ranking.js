import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: sortedRanking });
  }

  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="ranking">
          {!!ranking.length && (
            ranking.map((user, index) => (
              <div className="ranking__user-info" key={ user.name + user.score }>
                <p data-testid={ `player-name-${index}` }>{ user.name }</p>
                <p data-testid={ `player-score-${index}` }>{ user.score }</p>
              </div>
            ))
          )}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.redirect('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
