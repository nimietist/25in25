import { combineReducers } from 'redux'

function users (state, action) {
  switch (state) {
    case 'show_all':
      return action
    default:
      return state
  }
}

const reducers = combineReducers({
  users
})

export default reducers
