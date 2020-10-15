import { combineReducers } from "redux";
import countReducer from "./count";
import numsReducer from "./nums";

const rootReducer = combineReducers({ count: countReducer, nums: numsReducer });

export default rootReducer;
