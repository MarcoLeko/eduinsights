import {CLEAR_ERRORS, RECEIVE_ERRORS} from "./errors-action-types";
import {RECEIVE_CURRENT_USER} from "../auth/auth-action-types";

export default function errorReducer(state = "", { message, type }) {
    Object.freeze(state);
    switch (type) {
        case RECEIVE_ERRORS:
            return message;
        case RECEIVE_CURRENT_USER:
        case CLEAR_ERRORS:
            return "";
        default:
            return state;
    }
};