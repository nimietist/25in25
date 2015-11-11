import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { pushState } from 'redux-router'
import { connect } from 'react-redux'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import * as actions from '../actions'

function mapStateToProps (state) {
  return {
    q: state.router.location.query.q,
    users: state.users,
    user: state.user
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
    actions: PropTypes.object
  }
  handleClick = (e) => {
    const { actions } = this.props
    actions.fetchUsers()
    // this.props.dispatch(pushState({}, '/hello'))
    return false
  }
  renderChildren () {
    const children = this.props.children
    return children && React.cloneElement(children, {...this.props})
  }
  render () {
    return (
      <div>
        <NavBar {...this.props}/>
        <div className='app'>{this.renderChildren()}</div>
        <a href='#' onClick={this.handleClick}>click</a>
        <Footer/>
      </div>
    )
  }
}
