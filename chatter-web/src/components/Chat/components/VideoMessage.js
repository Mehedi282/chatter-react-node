import React from 'react';
import ReactPlayer from 'react-player';

function VideoMessage({src}) {
  return (
    <ReactPlayer url={src} controls width={250} height={170} style={{marginBottom: 10, marginTop: -10}} />
  )
}

export default VideoMessage;
