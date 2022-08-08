import React from 'react';
import {Modal} from "react-native";
import VideoPlayer from "react-native-video";
import {Body, CloseBtn, VideoContainer, Overlay, videoStyle} from "./styles";
import {Icon} from "../index";
import {IS_IOS} from "../../config/theme";
import constants from "../../config/constants";


const VideoMessage = ({currentMessage}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const video = React.useRef(null);

  const path = React.useMemo(() => currentMessage.video.includes('//data/user') ? currentMessage.video.replace(constants.bucket_url, '') : currentMessage.video, [currentMessage.video]);

  return (
    <>
      <VideoContainer onPress={() => setModalVisible(true)}>
        <VideoPlayer
          source={{ uri: path }}
          style={{width: 200, height: 140}}
          paused={IS_IOS ? true : paused}
          ref={video}
          resizeMode="contain"
          onReadyForDisplay={() => {
            video.current.seek(5);
            setTimeout(() => {
              setPaused(true);
            }, 300);
          }}
        />
        <Overlay><Icon name="play-circle-outline" size={30} color="#fff" /></Overlay>
      </VideoContainer>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        {modalVisible ? <Body>
          <CloseBtn onPress={() => setModalVisible(false)}><Icon name={"close-outline"} size={30} color="#fff" /></CloseBtn>
          {modalVisible ?
            <VideoPlayer source={{ uri: path }} style={videoStyle} resizeMode="contain" />
            : null
          }
        </Body> : null}
      </Modal>
    </>
  )
};

export default VideoMessage;
