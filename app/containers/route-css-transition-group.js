import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Modal } from 'react-bootstrap'
import StaticContainer from 'react-static-container'

export default class RouteCSSTransitionGroup extends React.Component {
  static contextTypes = {
    location: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.object,
    pushState: PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    this.shouldUpdate = true
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
    this.shouldUpdate = false
    this.props.pushState(null, this.previousPathname)
    setTimeout(() => {
      this.shouldUpdate = true
    }, 1)
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
            <div className='container'>
              {isModal ? this.previousChildren : children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
        {(
          <Modal
            show={!!isModal}
            onHide={this.close}
          >
            <Modal.Body>
              <div className='row modal-wrapper'>
                <StaticContainer
                  shouldUpdate={this.shouldUpdate && !!isModal}
                >
                  {React.cloneElement(children, {modal: true})}
                </StaticContainer>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    )
  }
}
