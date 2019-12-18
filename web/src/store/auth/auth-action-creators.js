import {loginUser, logoutUser, registerUser, sendNewValidationEmail} from "../thunks";
import {logoutCurrentUser, receiveCurrentUser} from "./auth-actions";
import {receiveMessageInterceptor} from "../alert/alert-actions";

export const logIn = user => async dispatch => {
    try {
        const response = await loginUser(user);
        return dispatch(receiveCurrentUser(response));
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));

    }
};
export const signUp = user => async dispatch => {
    try {
        const response = await registerUser(user);
        return dispatch(receiveCurrentUser(response));
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));
    }
};

export const logOut = () => async dispatch => {
    try {
        await logoutUser();
        return dispatch(logoutCurrentUser());
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));
    }
};

export const requestValidationEmail = () => async dispatch => {
    try {
        const response = await sendNewValidationEmail();
        return dispatch(receiveMessageInterceptor(response));
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));
    }
};