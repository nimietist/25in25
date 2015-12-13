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

export function completeGetUser (user, me = false) {
  return {
    type: 'GET_USER_COMPLETE',
    me,
    user
  }
}

export function getCurrentUser () {
  return dispatch => {
    return getit('/api/v1/users/current').then(function (user) {
      dispatch(completeGetUser(user, true))
      return user
    })
  }
}

export function getUser (username) {
  return dispatch => {
    return getit(`/api/v1/users/${username}`).then(function (user) {
      dispatch(completeGetUser(user))
      return user
    })
  }
}

export function updateUser (id, body) {
  return dispatch => {
    return getit(`/api/v1/users/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify(body)
    }).then(function (user) {
      dispatch(completeGetUser(user))
      return user
    })
  }
}

export function signUp (form) {
  return dispatch => {
    return getit('/api/v1/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(form)
    }).then(function (user) {
      dispatch(completeSignup(user))
      Promise.resolve()
    }).catch(function (_err) {
      dispatch(notify({
        type: 'danger',
        message: 'Invalid fields'
      }))
      Promise.reject()
    })
  }
}

export function completeSignup (user) {
  return {
    type: 'COMPLETE_SIGNUP',
    user
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

export function sendForgotPassword (email) {
  return dispatch => {
    return getit('/api/v1/forgot', {
      method: 'post',
      data: {email}
    }).then(data => {
      dispatch({
        type: 'FORGOT_SENT'
      })
      // TODO: pushState?
    })
    .catch((er) => {

    })
  }
}

export function resetForgotSent () {
  return {
    type: 'RESET_FORGOT_SENT'
  }
}

export function updatePassword (password) {
  return dispatch => {
    return getit('/api/v1/reset-password', {
      method: 'post',
      data: {password}
    }).then(data => {
      dispatch({
        type: 'FORGOT_SENT'
      })
    })
  }
}

export function getArtworks (params) {
  let query = Object.keys(params).map((key, value) => `${key}=${params[key]}`).join('&')
  return dispatch => {
    return getit(`/api/v1/artworks?${query}`, {
      method: 'get'
    }).then(artworks => {
      dispatch({
        type: 'COMPLETE_GET_ARTWORKS',
        artworks,
        hasMore: artworks.length > 0
      })
    })
  }
}

export function getArtwork (slug) {
  return dispatch => {
    return getit(`/api/v1/artwork/${slug}`, {
      method: 'get'
    }).then(artwork => {
      dispatch({
        type: 'COMPLETE_GET_ARTWORK',
        artwork
      })
    })
  }
}
