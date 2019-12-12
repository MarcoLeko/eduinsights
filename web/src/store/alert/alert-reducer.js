import {CLEAR, MESSAGE} from "./alert-action-types";

export default function alertReducer(state = {}, action) {
    switch (action.type) {
        case MESSAGE:
            return {
                message: action.message
            };
        case CLEAR:
            return {};
        default:
            return state
    }
};
