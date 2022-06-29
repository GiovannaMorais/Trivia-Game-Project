import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;

    const gravatarBaseUrl = 'https://www.gravatar.com/avatar/';
    const userEmailToHash = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ `${gravatarBaseUrl}${userEmailToHash}` }
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
