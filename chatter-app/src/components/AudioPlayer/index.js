import React from 'react';
import {View} from "react-native";
import {Btn, DurationTxt, PLAY_WIDTH, Row, StatusContainer, ViewBar, ViewBarPlay, Container, Wrapper, AvatarContainer} from "./styles";
import {Icon} from "../index";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import {millisToMinutesAndSeconds} from "../../utils/helpers";
import {Time, Avatar} from 'react-native-gifted-chat';

const defaultState = {
  currentPositionSec: 0,
  currentDurationSec: 0,
  isPlayed: false,
  isPaused: false,
};

const AudioPlayer = (props) => {
  const [player, setPlayer] = React.useState();
  const [state, setState] = React.useState({...defaultState});
  const previousId = React.useRef(props.currentAudioId);

  React.useEffect(() => {
    const audioRecorderPlayer = new AudioRecorderPlayer();
    setPlayer(audioRecorderPlayer);
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    }
  }, []);

  React.useEffect(() => {
    if (previousId.current !== props.currentAudioId && props.currentMessage._id === previousId.current) {
      player.stopPlayer();
      setState({...defaultState});
    }
    previousId.current = props.currentAudioId;
  }, [props.currentAudioId]);

  React.useEffect(() => {
    if (props.currentAudioId && player) {
      player.addPlayBackListener(e => {
        if (props.currentMessage._id === props.currentAudioId) {
          const isEnd = e.currentPosition > e.duration - 500;
          setState(state => ({...state,
            currentPositionSec: !isEnd ? e.currentPosition : 0,
            currentDurationSec: !isEnd ? e.duration : 0,
          }));
          if (isEnd) {
            player.stopPlayer();
            setState(s => ({...s, isPaused: false, isPlayed: false}));
          }
        }
      });
    }
  }, [props.currentAudioId, player, props.currentMessage._id]);


  const playPause = React.useCallback(async (id) => {
    props.setCurrentAudioId(props.currentMessage._id);
    if (state.isPaused) {
      await player.resumePlayer();
      setState(s => ({...s, isPaused: false}));
    } else if (state.isPlayed) {
      await player.pausePlayer();
      setState(s => ({...s, isPaused: true}));
    } else {
      await player.stopPlayer();
      await player.startPlayer(props.currentMessage.audio);
      setState(s => ({...s, isPlayed: true}));
    }
  }, [state, player, props.currentAudioId]);

  const onStatusPress = React.useCallback(e => {
    const aSec = state.currentDurationSec / PLAY_WIDTH;
    const touchX = e.nativeEvent.locationX;
    player.seekToPlayer(touchX * aSec);
  }, [state, player]);

  const playWidth = React.useMemo(() => ((state.currentPositionSec / state.currentDurationSec) * PLAY_WIDTH) || 0, [state]);

  if (!props.currentMessage?.audio) return <View/>;
  return (
    <Wrapper>
      {props.position === 'left' ? <AvatarContainer><Avatar {...props} /></AvatarContainer> : null}
      <Container active={props.position === 'right'}>
        <Row>
          <Btn onPress={() => playPause(props.currentMessage._id)}><Icon name={!state.isPlayed || state.isPaused ? "play-circle-outline" : "pause-circle-outline"} size={28} color={props.position === 'right' ? '#fff' : '#505050'} /></Btn>
          <StatusContainer onPress={onStatusPress}>
            <ViewBar white={props.position === 'right'}>
              <ViewBarPlay style={{width: playWidth}} white={props.position === 'right'} />
            </ViewBar>
          </StatusContainer>
        </Row>
        <DurationTxt white={props.position === 'right'}>{millisToMinutesAndSeconds(state.currentDurationSec - state.currentPositionSec)}</DurationTxt>
        <View style={{position: 'absolute', right: 10, bottom: 5}}>
          <Time {...props} />
        </View>
      </Container>
    </Wrapper>
  )
};

export default AudioPlayer;
