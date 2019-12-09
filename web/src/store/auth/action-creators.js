import {checkLoggedIn, loginUser, logoutUser, registerUser} from "../thunks";
import {checkLoggedInUser, logoutCurrentUser, receiveCurrentUser} from "./auth-actions";
import {receiveErrors} from "../alert/alert-actions";

export const logIn = user => async dispatch => {
    try {
        const response = await loginUser(user);
        const data = await response.json();
        return dispatch(receiveCurrentUser(data));
    } catch (e) {
        return dispatch(receiveErrors(e));

    }
};
export const signUp = user => async dispatch => {
    try {
        const response = await registerUser(user);
        const data = await response.json();
        return dispatch(receiveCurrentUser(data));
    } catch (e) {
        return dispatch(receiveErrors(e));
    }
};

export const checkLoginState = () => async dispatch => {
        const response = await checkLoggedIn();
        const {isAuthenticated} = await response.json();
        return dispatch(checkLoggedInUser(isAuthenticated));
};

export const logOut = () => async dispatch => {
    try {
        await logoutUser();
        return dispatch(logoutCurrentUser());
    } catch (e) {
        return dispatch(receiveErrors(e));
    }
};
