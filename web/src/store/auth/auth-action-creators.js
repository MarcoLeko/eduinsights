import {checkLoggedIn, loginUser, logoutUser, registerUser} from "../thunks";
import {logoutCurrentUser, receiveCurrentUser} from "./auth-actions";
import {receiveMessageInterceptor} from "../alert/alert-actions";

export const logIn = user => async dispatch => {
    try {
        const response = await loginUser(user);
        const data = await response.json();
        return dispatch(receiveCurrentUser(data));
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));

    }
};
export const signUp = user => async dispatch => {
    try {
        const response = await registerUser(user);
        const data = await response.json();
        return dispatch(receiveCurrentUser(data));
    } catch (e) {
        return dispatch(receiveMessageInterceptor(e));
    }
};

export const checkLoginState = () => async dispatch => {
    try {
        const response = await checkLoggedIn();
        const user = await response.json();
        return dispatch(receiveCurrentUser(user));
    }catch (e) {
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
