import React, {PropTypes} from 'react'
import Dropzone from 'react-dropzone'

export default class ImageUploader extends React.Component {
  static propTypes = {
    field: PropTypes.object,
    onDrop: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {files: []}
  }
  onDrop = (files) => {
    const {field, onDrop} = this.props
    this.setState({files})
    if (onDrop) onDrop(files)
    if (field) field.onChange(files)
  }
  render () {
    return (
      <Dropzone className='dropzone' multiple={false} onDrop={this.onDrop}>
        <div>{
          this.state.files.map((file) =>
          <img className='upload-preview' key={file.name} src={file.preview} />
          )
        }</div>
      </Dropzone>
    )
  }
}
