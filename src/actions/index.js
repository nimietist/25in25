import getit from '../helpers/fetch'

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
      method: 'post',
      data: form
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

export function updateUserWithImage (id, body) {
  return dispatch => {
    if (body.updateImage) {
      return dispatch(uploadProfileImage(id, body))
    } else {
      return dispatch(updateUser(id, body))
    }
  }
}
export function updateUser (id, body) {
  return dispatch => {
    return getit(`/api/v1/users/${id}`, {
      method: 'put',
      data: body
    }).then(function (user) {
      dispatch(completeGetUser(user))
      return user
    })
  }
}

export function signUp (form) {
  return dispatch => {
    return getit('/api/v1/users', {
      method: 'post',
      data: form
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

export function updatePassword (options) {
  return dispatch => {
    return getit('/api/v1/reset-password', {
      method: 'post',
      data: options
    }).then(data => {
      dispatch({
        type: 'FORGOT_SENT'
      })
    })
  }
}

export function getArtworks (params) {
  return dispatch => {
    return getit(`/api/v1/artworks`, {
      data: params
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
    return getit(`/api/v1/artworks/${slug}`).then(artwork => {
      dispatch({
        type: 'COMPLETE_GET_ARTWORK',
        artwork
      })
    })
  }
}

export function uploadArtwork (params) {
  return dispatch => {
    return uploadImage(params, (signed) => {
      getit(`/api/v1/artworks`, {
        method: 'post',
        data: {
          title: params.title,
          description: params.description,
          s3_key: signed.key
        }
      }).then(artwork => {
        dispatch({
          type: 'COMPLETE_UPLOAD_ARTWORK',
          artwork
        })
      })
    })
  }
}

export function uploadProfileImage (id, params) {
  return dispatch => {
    return uploadImage({file: params.file}, (signed) => {
      params.s3_key = signed.key
      console.error('uploadProfileImage', signed, params)
      dispatch(updateUser(id, params))
    })
  }
}

export function uploadImage (params, callback) {
  return getSignedS3Url(params.file)
    .then(signed => {
      getit(signed.url, {
        headers: {
          'x-amz-acl': 'public-read',
          'content-type': params.file.type
        },
        method: 'put',
        body: params.file,
        empty: true
      }).then((res) => {
        callback(signed)
      })
    })
}

export function getSignedS3Url (file) {
  return getit(`/api/v1/signS3?file_type=${file.type}`)
}

export function deactivateAccount (csrf) {
  return dispatch => {
    return getit(`/api/v1/users/deactivate`, {
      method: 'delete',
      data: {csrf}
    }).then(success => {
      dispatch({
        type: 'COMPLETE_DEACTIVATE_ACCOUNT'
      })
    })
    .catch(console.log)
  }
}
