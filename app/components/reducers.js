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

const reducers = combineReducers({
  router: routerStateReducer,
  users
})

export default reducers
