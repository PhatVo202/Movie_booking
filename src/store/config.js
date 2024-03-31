import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import { registerUserReducer } from "./reducers/registerUser";
import { userListReducer } from "./reducers/userListReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  registerUserReducer,
  userListReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
