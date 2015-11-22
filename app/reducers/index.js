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
    case 'COMPLETE_SIGNUP':
      return action.user
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

function signup (state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_SIGNUP':
      return { success: true }
    default:
      return state
  }
}

function forgotSent (state = false, action) {
  switch (action.type) {
    case 'FORGOT_SENT':
      return true
    case 'RESET_FORGOT_SENT':
      return false
    default:
      return state
  }
}

const reducers = combineReducers({
  router,
  alerts,
  user,
  signup,
  things,
  forgotSent
})

export default reducers
