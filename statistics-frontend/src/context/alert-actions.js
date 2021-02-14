import { CLEAR, MESSAGE } from "./alert-action-types";

export const clearMessage = () => ({ type: CLEAR });

export const receiveMessageInterceptor = (e) => {
  if (e?.message) {
    return { type: MESSAGE, message: e.message };
  } else {
    clearMessage();
  }
};
