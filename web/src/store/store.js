import {applyMiddleware, combineReducers, createStore} from "redux";
import uiReducer from "./ui/ui-reducer";
import authReducer from "./auth/auth-reducer";
import errorsReducer from "./errors/errors-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({uiReducer, authReducer, errorsReducer});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
