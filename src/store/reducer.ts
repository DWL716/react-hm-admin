import {combineReducers} from 'redux'

import login from './reducers/login'
import layout from './reducers/layout'
import menu from './reducers/menu'
import systemUser from './reducers/system/bureauLevel'

const rootReducer = combineReducers({
  login: login,
  layout: layout,
  menu: menu,
  systemUser: systemUser,
}) 

export default rootReducer