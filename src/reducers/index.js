import { createStore, combineReducers } from 'redux'
//import createStore and combineReducer, explaination below
import { composeWithDevTools} from 'redux-devtools-extension'
import SignIn from './login'
import LogOut from './logout'
//import all actions reducers to combine them later on
import TODO from './todo'

// make reducer variable and it use combineReducer and pass it all the reducer you need to combine
const reducers = combineReducers({ SignIn, LogOut, TODO })

// store is a function we export and it has all reducers plus middlewares if we have any
// we used composeWithDevtools as it's usefull in broswer console we see all states in details
const store= ()=> {
    return createStore(reducers, composeWithDevTools());
}

export default store();