import React from 'react';
import AudioPlayer from 'react-audio-player';

function AudioMessage({src}) {
  return (
    <div style={{marginBottom: 15}}>
      <AudioPlayer
        src={src}
        controls
      />
    </div>
  )
}

export default AudioMessage;
