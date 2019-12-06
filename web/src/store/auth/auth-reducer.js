import {CHECK_LOGGED_IN, LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";
import Cookies from 'js-cookie';

const initialState = {isAuthenticated: Boolean(Cookies.get('sid')), firstName: null, lastName: null, avatarColor: null, email: null};
export default function authReducer(state = initialState, { type, user }) {
    switch (type) {
        case RECEIVE_CURRENT_USER:
            return user;
        case LOGOUT_CURRENT_USER:
            return initialState;
        case CHECK_LOGGED_IN:
            return {...state, isAuthenticated: user.isAuthenticated};
        default:
            return state;
    }
}