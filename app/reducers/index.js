import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'

function user (state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_LOGIN':
      return action.user
    case 'GET_USER_COMPLETE':
      return action.user
    case 'COMPLETE_LOGOUT':
      return {}
    default:
      return state
  }
}

function alerts (state = [], action) {
  switch (action.type) {
    case 'NOTIFICATION':
      return [action.alert]
    case 'CLEAR_NOTIFICATIONS':

      return []
    default:
      return state
  }
}

function things (state = {}, action) {
  switch (action.type) {
    case 'SOMETHING':
      return action.data
    default:
      return state
  }
}

const reducers = combineReducers({
  router,
  alerts,
  user,
  things
})

export default reducers
