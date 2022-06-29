import { SEND_USER_INFO, SEND_USER_GAME_INFO } from './actionTypes';

export const sendUserInfo = (info) => ({
  type: SEND_USER_INFO,
  payload: info,
});

export const sendUserGameInfo = (score, assertions) => ({
  type: SEND_USER_GAME_INFO,
  payload: {
    score,
    assertions,
  },
});
