import React, { PropTypes } from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'
import routes from '../routes'

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <ReduxRouter routes={routes}/>
      </Provider>
    )
  }
}
