import {CHECK_LOGGED_IN, LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";

const initialState = {isAuthenticated: false, firstName: null, lastName: null, avatarColor: null, email: null};
export default function authReducer(state = initialState, { type, user }) {
    switch (type) {
        case LOGOUT_CURRENT_USER:
            return initialState;
        case RECEIVE_CURRENT_USER:
        case CHECK_LOGGED_IN:
            return user;
        default:
            return state;
    }
}