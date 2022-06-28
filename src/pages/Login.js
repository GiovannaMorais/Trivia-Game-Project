import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchToken from '../services/fetchToken';
import isEmailValid from '../utils/isEmailValid';
import { sendUserInfo } from '../redux/actions/actions';

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
    const { history, dispatchUserInfo } = this.props;
    dispatchUserInfo(this.state);
    await fetchToken();
    history.push('/game');
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.goToSettings }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchUserInfo: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  dispatchUserInfo: (info) => dispatch(sendUserInfo(info)),
});

export default connect(null, mapDispatchToProps)(Login);
