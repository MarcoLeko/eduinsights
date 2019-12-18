import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";

export const receiveCurrentUser = (user) => ({type: RECEIVE_CURRENT_USER, user});
export const logoutCurrentUser = () => ({type: LOGOUT_CURRENT_USER});
