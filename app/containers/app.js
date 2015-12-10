import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import FlashAlert from '../components/flashalert'
import RouteCSSTransitionGroup from './route-css-transition-group'

import * as actions from '../actions'

function mapStateToProps (state) {
  return {
    q: state.router.location.query.q,
    user: state.user,
    alerts: state.alerts,
    things: state.things,
    forgotSent: state.forgotSent
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    pushState
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.node,
    actions: PropTypes.object,
    alerts: PropTypes.array,
    user: PropTypes.object
  }
  static fetchData (dispatch) {
    return new Promise((resolve, reject) => {
      resolve('fetch:app')
    })
  }
  handleAlertDismiss = (e) => {
    const { actions } = this.props
    actions.clearNotifications()
  }
  renderAlerts () {
    if (!this.props.alerts.length) return
    return this.props.alerts.map((alert, i) => {
      return <FlashAlert alert={alert} key={i} {...this.props} />
    })
  }
  renderChildren () {
    const {children, ...props} = this.props
    return (
      <div className='container'>
        {children && React.cloneElement(children, props)}
      </div>
    )
  }
  render () {
    return (
      <div>
        {this.renderAlerts()}
        <NavBar {...this.props}/>
        <RouteCSSTransitionGroup
          className='app'
          component='div'
          transitionName='example'
          transitionEnterTimeout={200}
          transitionLeaveTimeout={1}
          >
          {this.renderChildren()}
        </RouteCSSTransitionGroup>
        <Footer/>
      </div>
    )
  }
}
