import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { Button } from '@material-ui/core';

const ImageCrop = ({
  imageSrc,
  onCrop,
  setEditorRef,
  scaleValue,
  onScaleChange,
}) => (
  <div>
    <div className="editorOverlayInner">
      <div className="editorModalContent clearfix">
        <div className="cropCnt">
          <AvatarEditor
            image={imageSrc}
            border={50}
            scale={scaleValue}
            rotate={0}
            ref={setEditorRef}
            className="cropCanvas"
          />
          <input
            style={{ width: '100%' }}
            type="range"
            value={scaleValue}
            name="points"
            min="1"
            max="10"
            onChange={onScaleChange}
          />
          <Button onClick={onCrop} className="editorOverlayCloseBtn crpBtn">
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
);

ImageCrop.propTypes = {
  setEditorRef: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  scaleValue: PropTypes.number.isRequired,
  onScaleChange: PropTypes.func.isRequired,
};

export default ImageCrop;
