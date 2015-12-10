import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import StaticContainer from 'react-static-container'
import Modal from 'react-modal'

export default class RouteCSSTransitionGroup extends React.Component {
  static contextTypes = {
    location: React.PropTypes.object
  }

  static propTypes = {
    children: React.PropTypes.object
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      previousPathname: null
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      if (nextContext.location.state && nextContext.location.state.modal) {
        if (!this.context.location.state || !this.context.location.state.modal) {
          this.previousChildren = this.props.children
          this.previousPathname = this.context.location.pathname
        }
      }
    }
  }

  render () {
    const { children, ...props } = this.props
    const { location } = this.context

    let isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div>
        <ReactCSSTransitionGroup {...props}>
          <div className='routeWrapper' key={isModal ? this.previousPathname : location.pathname}>
            {isModal ? this.previousChildren : children}
          </div>
        </ReactCSSTransitionGroup>
        {isModal && (
          <Modal style={{content: {bottom: '500px'}}} isOpen={true} returnTo={location.state.returnTo}>
            {children}
          </Modal>
        )}
      </div>
    )
  }
}
