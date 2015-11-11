import React from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore.prod'

const store = configureStore()

export default class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    )
  }
}
