export function requestUsers () {
  return {
    type: 'REQUEST_USERS',
    test: 123
  }
}

export function completeRequestUsers () {
  return { type: 'COMPLETE_USERS', test: 456 }
}

export function fetchUsers () {
  return dispatch => {
    dispatch(requestUsers())
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        dispatch(completeRequestUsers())
        resolve()
      }, 1000)
    })
  }
}

export function completeLogin (user) {
  return {
    type: 'COMPLETE_LOGIN',
    user: user
  }
}

export function completeLogout () {
  return {
    type: 'COMPLETE_LOGOUT'
  }
}

export function logIn (user) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        dispatch(completeLogin({name: 'dude'}))
        resolve()
      }, 1000)
    })
  }
}

export function logOut () {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        dispatch(completeLogout())
        resolve()
      }, 1000)
    })
  }
}
