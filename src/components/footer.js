import React from 'react'
// import { Button, Input, Nav, NavBrand, NavItem, Navbar } from 'react-bootstrap'

export default class Footer extends React.Component {
  render () {
    return (
      <div className='footer'>
        <a href='#'><span data-hover='TOS'>TOS</span></a> |
        <a href='#'> Privacy Policy</a> |
        © 2016 A Caveglow Product. All Rights Reserved
      </div>
    )
  }
}
