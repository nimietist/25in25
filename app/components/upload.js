import React, { PropTypes } from 'react'
// import { Link } from 'react-router'
import { Input, Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form'
import ImageUploader from './image-uploader'
import { uploadArtwork } from '../actions'

const MAX_DESCRIPTION_LENGTH = 200
const fields = ['title', 'description', 'image']

const validate = (values) => {
  const errors = {}
  if ((values.description || '').length > MAX_DESCRIPTION_LENGTH) {
    errors.description = 'Title required'
  }
  return errors
}

@reduxForm({form: 'uploadr', fields, validate})
export default class Upload extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
    user: PropTypes.object,
    submitting: PropTypes.bool.isRequired
  }
  uploadForm = () => {
    const {fields: {image, title, description}} = this.props
    console.error('upload', image);
    // return;
    return this.props.dispatch(uploadArtwork({
      file: image.value[0],
      title: title.value,
      description: description.value
    }))
  }
  render () {
    const {fields: {title, description, image}, submitting} = this.props

    return (
      <div className='upload col-md-offset-2 col-md-8 col-xs-12'>
        <form onSubmit={this.props.handleSubmit(this.uploadForm)}>
          <div className='col-sm-4'>
            <ImageUploader field={image} />
          </div>
          <div className='col-sm-8'>
            <Input label='Title (optional)' type='text' {...title} />
            <Input
              className='description'
              label='Description (optional)'
              type='textarea'
              maxLength={MAX_DESCRIPTION_LENGTH}
              {...description}
            />
            <div className='pull-right'>
              {MAX_DESCRIPTION_LENGTH - (description.value || '').length}
            </div>
          </div>
          <Button
            block
            disabled={submitting}
            bsStyle='primary'
            type='submit'>
            Upload!
          </Button>
        </form>
      </div>
    )
  }
}
