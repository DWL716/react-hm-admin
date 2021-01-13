import {combineReducers} from 'redux'

import login from './reducers/login'
import layout from './reducers/layout'
import menu from './reducers/menu'

const rootReducer = combineReducers({
  login: login,
  layout: layout,
  menu: menu,
}) 

export default rootReducer