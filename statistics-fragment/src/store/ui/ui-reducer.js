import {CAN_SWIPE} from "./ui-action-types";

const initialState = {
    canSwipe: true
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case CAN_SWIPE: {
            return {
                ...state,
                canSwipe: action.canSwipe
            }
        }
        default:
            return state;
    }
}
