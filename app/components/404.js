import React, { PropTypes } from 'react'

export default class extends React.Component {
  static propTypes = {
    actions: PropTypes.object
  }
  handleClick = (e) => {
    const { actions } = this.props
    actions.logIn()
  }
  render () {
    return (
      <div>
        404 Not found,
        <a href='#' onClick={this.handleClick}> login</a>
      </div>
    )
  }
}
