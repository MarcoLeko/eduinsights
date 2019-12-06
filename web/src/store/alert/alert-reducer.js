import {CLEAR, ERROR, SUCCESS} from "./alert-action-types";

export default function alertReducer(state = {}, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case CLEAR:
            return {};
        default:
            return state
    }
};