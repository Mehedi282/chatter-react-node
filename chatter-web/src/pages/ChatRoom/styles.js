import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  border-radius: 25px;
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg : '#fff'};
  display: flex;
  overflow: hidden;
  audio::-webkit-media-controls-panel {
    background-color: ${({theme}) => theme.bg2};
  }
  audio::-webkit-media-controls-play-button {
    background-color: #B1D4E0;
    border-radius: 50%;
    margin-right: 5px;
  }
  audio::-webkit-media-controls-current-time-display, audio::-webkit-media-controls-time-remaining-display {
    color: ${({theme}) => theme.txt};
  }
  .loading {
    width: 100%;
    justify-content: center;
  }
`;
