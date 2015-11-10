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
    console.error('asdfasdf');
    dispatch(requestUsers())
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        dispatch(completeRequestUsers())
        resolve()
      }, 1000)
    })
  }
}
