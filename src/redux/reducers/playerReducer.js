import { SEND_USER_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_INFO:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default player;
