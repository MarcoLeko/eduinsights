import {CAN_SWIPE, IS_LOGGED_IN, TOGGLE_SIDEBAR} from "./action-types";

const initialState = {
    canSwipe: true,
    isOpen: false,
    isLoggedIn: true
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
        case IS_LOGGED_IN: {
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn

            }
        }
        default:
            return state;
    }
}
