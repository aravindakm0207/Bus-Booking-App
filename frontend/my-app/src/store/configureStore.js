/*import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // Correct import

import userReducer from "../reducers/userReducer";
import busOperatorReducer from "../reducers/operatorReducer";
import busReducer from "../reducers/busReducer";

const configStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      busOperators: busOperatorReducer,
      buses: busReducer, // Ensure this is included if needed
    }),
    applyMiddleware(thunk)
  );

  return store;
};

export default configStore;
*/
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import busReducer from '../reducers/busReducer';
import tripReducer from '../reducers/tripReducer';
import { seatLayoutReducer, bokingReducer } from '../reducers/seatReducers';
import forgotReducer from '../reducers/forgot-reducer'
import resetReducer from '../reducers/reset-reducer'

const rootReducer = combineReducers({
    buses: busReducer,
    seatLayout: seatLayoutReducer,
    boking: bokingReducer,
    trips:tripReducer,
    forgot:forgotReducer,
    reset:resetReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
