import {CAN_SWIPE, TOGGLE_SIDEBAR} from "./action-types";

const initialState = {
    canSwipe: true,
    isOpen: false
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CAN_SWIPE: {
        return {
            ...state,
            canSwipe: action.payload.canSwipe
        }
        }
        case TOGGLE_SIDEBAR: {
            return {
                ...state,
                isOpen: action.payload.isOpen

            }
        }
        default:
            return state;
    }
}
