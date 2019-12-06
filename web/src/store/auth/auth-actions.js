import {CHECK_LOGGED_IN, LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";

export const receiveCurrentUser = user => ({type: RECEIVE_CURRENT_USER, user});
export const logoutCurrentUser = () => ({type: LOGOUT_CURRENT_USER});
export const checkLoggedInUser = (loggedIn) => ({type: CHECK_LOGGED_IN, user: {isAuthenticated: loggedIn}});