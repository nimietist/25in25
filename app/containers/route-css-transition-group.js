import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Modal } from 'react-bootstrap'

export default class RouteCSSTransitionGroup extends React.Component {
  static contextTypes = {
    location: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.object,
    pushState: PropTypes.func
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

  close = () => {
    this.props.pushState(null, this.previousPathname)
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
        {(
          <Modal
            show={!!isModal}
            onHide={this.close}
          >
            {children}
          </Modal>
        )}
      </div>
    )
  }
}
