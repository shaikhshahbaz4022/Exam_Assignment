import {legacy_createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {reducer as instructoreReducer} from "./instructorReducer/reducer.js"
import {reducer as userReducer} from "./userReducer/reducer.js"

const rootReducer=combineReducers({
    instructoreReducer,
    userReducer
})


export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))