import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
// import actions from './actions'

function users (state = {}, action) {
  switch (action.type) {
    case 'REQUEST_USERS':
      state.name = 'john'
      state.test = action.test
      return state
    case 'COMPLETE_USERS':
      state.complete = true
      state.test = action.test
      return state
    default:
      return state
  }
}

function user (state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_LOGIN':
      return action.user
    case 'COMPLETE_LOGOUT':
      return {}
    default:
      return state
  }
}

function initial_state (state = {}) {
  return state
}
const reducers = combineReducers({
  router: routerStateReducer,
  users,
  user,
  initial_state
})

export default reducers
