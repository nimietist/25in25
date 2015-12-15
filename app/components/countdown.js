import React from 'react'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'
// import ReactTimeout from 'react-timeout'

// @ReactTimeout
@connect(state => ({eventDate: state.eventDate}))
export default class Count extends React.Component {
  static propTypes = {

  }
  constructor (props) {
    super(props)
    this.state = {timeLeft: ''}
  }
  componentDidMount () {
    // const { setInterval } = this.props.reactTimeout
    setInterval(this.updateTimeLeft, 1000)
  }
  getTimeRemaining (endtime) {
    var t = Date.parse(endtime) - Date.now()
    var seconds = Math.floor( (t/1000) % 60 )
    var minutes = Math.floor( (t/1000/60) % 60 )
    var hours = Math.floor( (t/(1000*60*60)) % 24 )
    var days = Math.floor( t/(1000*60*60*24) )
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }
  updateTimeLeft = () => {
    let timeLeft = this.getTimeRemaining(this.props.eventDate || '2016-01-05 00:00:00')
    this.setState({ timeLeft })
  }
  render () {
    let t = this.state.timeLeft
    return (
      <Jumbotron className='text-center'>
        <h3>Lorem Ipsum</h3>
        <h2>{t.days} days, {t.hours}:{t.minutes}:{t.seconds}</h2>
      </Jumbotron>
    )
  }
}
