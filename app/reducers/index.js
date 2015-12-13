import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import { reducer as form } from 'redux-form'

function user (state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_LOGIN':
      return action.user
    case 'GET_USER_COMPLETE':
      if (action.me) {
        return action.user
      } else {
        return state
      }
      break
    case 'COMPLETE_LOGOUT':
      return {}
    case 'COMPLETE_SIGNUP':
      return action.user
    default:
      return state
  }
}

function currentUser (state = {}, action) {
  switch (action.type) {
    case 'GET_USER_COMPLETE':
      if (!action.me) {
        return action.user
      } else {
        return state
      }
      break
    default:
      return state
  }
}

function artworks (state = [], action) {
  switch (action.type) {
    case 'COMPLETE_GET_ARTWORKS':
      return action.artworks
      // return [{title: 'title', username: 'someone else'}]
    default:
      return state
  }
}

function artwork (state = {}, action) {
  switch (action.type) {
    case 'COMPLETE_GET_ARTWORK':
      return action.artwork
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
  alerts,
  artwork,
  artworks,
  currentUser,
  forgotSent,
  form,
  router,
  signup,
  things,
  user
})

export default reducers
