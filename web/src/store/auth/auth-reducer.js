import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";
import Cookies from 'js-cookie';

const initialState = {isAuthenticated: Cookies.get('sid'), firstName: null, lastName: null, avatarColor: null, email: null};

export default function authReducer(state = initialState, {type, user}) {
    switch (type) {
        case LOGOUT_CURRENT_USER:
            return initialState;
        case RECEIVE_CURRENT_USER:
            return user;
        default:
            return state;
    }
}
