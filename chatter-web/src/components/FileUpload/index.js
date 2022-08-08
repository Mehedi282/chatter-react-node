import React from 'react';

const FileUpload = ({onChange, accept, ...props}) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    onChange(fileUploaded);
  };

  return (
    <>
      <div onClick={handleClick}>
        {props.children}
      </div>
      <input
        type="file"
        accept={accept}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  );
};

export default FileUpload;
