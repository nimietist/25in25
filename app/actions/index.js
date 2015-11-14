import getit from 'app/lib/fetch'

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

export function logIn (form) {
  return dispatch => {
    return getit('/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(form)
    }).then(function (user) {
      dispatch(completeLogin(user))
      Promise.resolve()
    }).catch(function (_err) {
      dispatch(notify({
        type: 'danger',
        message: 'Invalid credentials'
      }))
      Promise.reject()
    })
  }
}

export function logOut () {
  return dispatch => {
    return getit('/api/v1/logout').then(function () {
      dispatch(completeLogout())
      Promise.resolve()
    }, 1000)
  }
}

export function notify (alert) {
  return {
    type: 'NOTIFICATION',
    alert: alert
  }
}

export function clearNotifications () {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

export function getThings () {
  return dispatch => {
    return getit('/api/v1/things').then(things => {
      dispatch({
        type: 'SOMETHING',
        data: things
      })
      return things
    })
  }
}
