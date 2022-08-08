/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import mainReducer from '../redux/reducer'
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    main: mainReducer,

    ...injectedReducers
  });

  return (state, action) => {
    if (action.type === "LOGOUT") {
      state = undefined;
    }
    return rootReducer(state, action);
  };
}
