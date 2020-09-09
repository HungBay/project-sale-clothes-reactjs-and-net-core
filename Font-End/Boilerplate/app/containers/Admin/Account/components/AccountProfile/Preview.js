import React, { Component } from 'react';
import ImageCrop from './ImageCrop';

class Preview extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userProfilePic: '',
      editor: null,
      scaleValue: 1,
    };
  }

  setEditorRef = editor => this.setState({ editor });

  onCrop = () => {
    const { editor } = this.state;
    const { getUserProfilePic } = this.props;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      this.setState({ userProfilePic: url });
      getUserProfilePic(url);
    }
  };

  onScaleChange = scaleChangeEvent => {
    const scaleValue = parseFloat(scaleChangeEvent.target.value);
    this.setState({ scaleValue });
  };

  DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  profilePicChange = fileChangeEvent => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (
      !(
        type.endsWith('jpeg') ||
        type.endsWith('png') ||
        type.endsWith('jpg') ||
        type.endsWith('gif')
      )
    ) {
    } else {
      this.setState({
        openCropper: true,
        selectedImage: fileChangeEvent.target.files[0],
        fileUploadErrors: [],
      });
    }
  };
  render() {
    const { preview } = this.props;
    return (
      <div className="App">
        <input
          type="file"
          name="profilePicBtn"
          accept="image/png, image/jpeg"
          onChange={this.profilePicChange}
        />
        <ImageCrop
          imageSrc={
            this.state.selectedImage ? this.state.selectedImage : preview
          }
          setEditorRef={this.setEditorRef}
          onCrop={this.onCrop}
          scaleValue={this.state.scaleValue}
          onScaleChange={this.onScaleChange}
        />

        <img src={this.state.userProfilePic} alt="Profile" />
      </div>
    );
  }
}

export default Preview;
