import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import isEmailValid from '../utils/isEmailValid';

class Login extends React.Component {
  state = {
    name: '',
    gravatarEmail: '',
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  isFormValid = () => {
    const { name, gravatarEmail } = this.state;
    return (name && isEmailValid(gravatarEmail));
  }

  handleUserLogin = async () => {
    const { history } = this.props;
    await fetchToken();
    history.push('/game');
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            data-testid="input-player-name"
            value={ name }
            name="name"
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="gravatarEmail">
          Email
          <input
            type="email"
            name="gravatarEmail"
            id="gravatarEmail"
            placeholder="Digite o seu e-mail"
            value={ gravatarEmail }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleUserLogin }
          disabled={ !this.isFormValid() }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
// const mapDispatchToProps = ()

export default connect()(Login);
