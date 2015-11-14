import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'
import classNames from 'classnames'

export default class FlashAlert extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {hidden: false}
  }
  static propTypes = {
    actions: PropTypes.object,
    alert: PropTypes.object
  }
  handleAlertDismiss = (e) => {
    this.setState({
      hidden: true
    })
  }
  render () {
    const { actions, alert } = this.props
    const classes = classNames('animated', {
      slideInDown: !this.state.hidden,
      slideOutUp: this.state.hidden
    })
    if (this.state.hidden) {
      setTimeout(function () {
        actions.clearNotifications()
      }, 4000)
    }
    return (
      <Alert
          ref='container'
          className={classes}
          bsStyle={alert.type}
          dismissAfter={5000}
          onDismiss={this.handleAlertDismiss}>
        {alert.message}
      </Alert>
    )
  }
}
