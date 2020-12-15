import {CLEAR, MESSAGE} from "./alert-action-types";

export const clearMessage = () => ({type: CLEAR});

export const receiveMessageInterceptor = ({message}) => {
    if (message) {
        return {type: MESSAGE, message}
    } else {
        clearMessage();
    }
};
