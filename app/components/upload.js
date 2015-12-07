import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import { Input, Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

const fields = ['title', 'description', 'image']

const validate = (values) => {
  const errors = {}

  // if (!values.title) {
  //   errors.title = 'Title required'
  // }
  return errors
}

@reduxForm({form: 'uploadr', fields, validate})
export default class Upload extends React.Component {
  static propTypes = {
    fields: PropTypes.array,
    handleSubmit: PropTypes.func,
    actions: PropTypes.object,
    user: PropTypes.object
  }
  componentDidMount () {
    // TODO: load ?
  }
  uploadForm () {
    // TODO: Upload title, desc, and image
  }
  render () {
    const {fields: {title, description}} = this.props

    return (
      <div className='upload col-md-offset-2 col-md-8 col-xs-12'>
        <form onSubmit={this.props.handleSubmit(this.uploadForm)}>
          <div className='col-sm-5'>
            TODO: upload box here
          </div>
          <div className='col-sm-7'>
            <Input label='Title (optional)' type='text' {...title} />
            <Input label='Description (optional)' type='textarea' {...description} />
          </div>
        <Button block={1} type='submit'>Upload</Button>
        </form>
      </div>
    )
  }
}
