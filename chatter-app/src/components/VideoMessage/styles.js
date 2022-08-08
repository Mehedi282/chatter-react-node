import styled from "styled-components/native";
import {IS_IPHONE_X, WINDOW_WIDTH} from "../../config/theme";

const Body = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #000;
`;

const VideoContainer = styled.TouchableOpacity`
  width: 200px;
  height: 140px;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.View`
  width: 40px;
  height: 40px;
  background-color: rgba(0,0,0,0.55);
  border-radius: 25px;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: ${IS_IPHONE_X ? '35' : '55'};
  left: 20px;
  z-index: 2;
`;

const videoStyle = {
  width: WINDOW_WIDTH,
  height: 200
};

export {Body, CloseBtn, videoStyle, VideoContainer, Overlay};
