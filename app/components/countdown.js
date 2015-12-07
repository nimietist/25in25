import React, { PropTypes } from 'react'
import { Jumbotron } from 'react-bootstrap'

export default class Count extends React.Component {
  render () {
    return (
      <Jumbotron className='text-center'>
        <h3>Lorem Ipsum</h3>
        <h2>
          Countdown here
        </h2>
      </Jumbotron>
    )
  }
}
