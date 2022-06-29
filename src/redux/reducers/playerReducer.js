import {
  SEND_USER_GAME_INFO,
  SEND_USER_INFO,
  RESET_USER_POINTS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case SEND_USER_GAME_INFO:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  case RESET_USER_POINTS:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default player;
