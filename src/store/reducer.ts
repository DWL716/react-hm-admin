import {combineReducers} from 'redux'

import login from './reducers/login'

const rootReducer = combineReducers({
  login: login
}) 

export default rootReducer