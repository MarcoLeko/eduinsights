import {LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER} from "./auth-action-types";

export const receiveCurrentUser = ({isAuthenticated, firstName, lastName, avatarColor, email}) => ({type: RECEIVE_CURRENT_USER, user: {
        isAuthenticated, firstName, lastName, avatarColor, email
    }});
export const logoutCurrentUser = () => ({type: LOGOUT_CURRENT_USER});
