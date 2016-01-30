import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router'

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {open: true}
  }
  onClose = (e) => {
    this.setState({open: false})
    // this.props.history.goBack()
  }
  render () {
    return (
      <Modal
        isOpen={this.state.open}
        onRequestClose={this.onClose}
        >
        <Link to='/modal/1'>Thing</Link>
        {this.props.children}
      </Modal>
    )
  }
}
