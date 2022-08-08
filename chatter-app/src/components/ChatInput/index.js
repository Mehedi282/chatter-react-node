import React from 'react';
import {IconContainer, Input, InputContainer, ActionsContainer, Row, Btn, RowItem} from "./styles";
import {View} from "react-native";
import {Icon, Text} from "../index";
import {getTheme, IS_IOS} from "../../config/theme";
import RNFetchBlob from 'rn-fetch-blob';
import {MenuTrigger, Menu, MenuOptions, renderers} from "react-native-popup-menu";
import audioPicker from "../../utils/audioPicker";
import {getImageFromCamera, getImageFromLibrary} from "../../utils/imagePicker";
import LocationModal from "./LocationModal";
import {withMenuContext} from 'react-native-popup-menu';
import androidAudioPermission from "../../utils/androidAudioPermision";
import {getFileObj, getUploadHeaders} from "../../utils/helpers";
import constants from "../../config/constants";
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption
} from "react-native-audio-recorder-player";
const RNFS = require('react-native-fs');


const ChatInput = ({value, onChange, onSend, appendMessage, ...props}) => {
  const [onRec, setOnRec] = React.useState(false);
  const [locModalVisible, setLocModalVisible] = React.useState(false);
  const [recorder, setRecorder] = React.useState();
  const theme = getTheme();
  const audioFileName = React.useMemo(() => {
    const dirs = RNFetchBlob.fs.dirs;
    return  Platform.select({
      ios: 'audio.m4a',
      android: `${dirs.CacheDir}/audio.mp3`,
    })
  }, []);

  React.useEffect(() => {
    const audioRecorderPlayer = new AudioRecorderPlayer();
    setRecorder(audioRecorderPlayer);
  }, []);

  const submit = React.useCallback(async () => {
    if (!value) {
      const permission = await androidAudioPermission();
      if (permission) {
        const audioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.medium,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        await recorder.startRecorder(audioFileName, audioSet);
        setOnRec(true);
      }
    } else {
      sendMessage({text: value});
      onChange('');
    }
  }, [value, recorder]);

  const deleteRecord = React.useCallback(() => {
    recorder.stopRecorder();
    setOnRec(false);
  }, [recorder]);

  const sendMessage = React.useCallback((data) => {
    appendMessage(data);
    onSend(data);
  }, []);

  const uploadFile = React.useCallback(async (file, obj = true) => {
    const form = new FormData();
    form.append('file', obj ? getFileObj(file) : file);
    let data = {method: 'POST', headers: await getUploadHeaders(), body: form};
    const res = await (await fetch(constants.base_url + `/api/v1/chat/file`, data)).json();
    return res.path;
  }, []);

  const stopRecord = React.useCallback(async () => {
    const uri = await recorder.stopRecorder();
    const fileType = IS_IOS ? 'mp4' : 'mp3';
    const file = {
      uri,
      name: `audio.${fileType}`,
      type: `audio/${fileType}`,
    };
    setOnRec(false);
    let data = {audio: uri};
    appendMessage(data, async (id) => {
      data.audio = await uploadFile(file, false);
      onSend(data);
      props.updateMessageData(id, data);
    });
  }, [recorder]);

  const sendPicOrVideo = React.useCallback(async (source) => {
    await props.ctx.menuActions.closeMenu();
    const type = source.type.includes('image') ? 'image' : 'video';
    let preview = source.uri;
    if (type === 'video' && !IS_IOS) {
      const destPath = `${RNFS.TemporaryDirectoryPath}/source.mp4`;
      await RNFS.copyFile(source.uri, destPath);
      preview = (await RNFS.stat(destPath)).path;
    }
    let data = {[type]: preview};
    appendMessage(data);
    data[type] = await uploadFile(source);
    onSend(data);
  }, []);
  const sendImage = React.useCallback(async () => {
    const source = await getImageFromLibrary({mediaType: 'mixed', quality: 0.5});
    sendPicOrVideo(source);
  }, []);
  const sendFromCamera = React.useCallback(async () => {
    const source = await getImageFromCamera({mediaType: 'mixed', quality: 0.5});
    sendPicOrVideo(source);
  }, []);

  const sendAudio = React.useCallback(async () => {
    const data = await audioPicker();
    appendMessage({audio: IS_IOS ? data.uri : data.fileCopyUri});
    await props.ctx.menuActions.closeMenu();
    onSend({audio: await uploadFile(data, false)});
  }, []);

  const sendLocation = React.useCallback(async (location) => {
    setLocModalVisible(false);
    if (location.latitude && location.longitude)
      sendMessage({location: {latitude: location.latitude, longitude: location.longitude}});
    await props.ctx.menuActions.closeMenu();
  }, []);

  return (
    <>
      <InputContainer>
        <Input
          value={value}
          onChangeText={onChange}
          placeholder={"Message"}
        />
        {onRec ?
          <View style={{marginRight: -10}} /> :
          <Menu renderer={renderers.SlideInMenu}>
            <MenuTrigger>
              <View style={{marginRight: 13, transform: [{rotate: '280deg'}]}}>
                <Icon size={21} name="attach-outline" color={theme.gray} />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <ActionsContainer>
                <Row>
                  <RowItem onPress={sendImage}>
                    <Btn style={{backgroundColor: '#0984e3'}}><Icon name="image" size={20} color={'#fff'} /></Btn>
                    <Text noFont wieght={400}>Gallery</Text>
                  </RowItem>
                  <RowItem onPress={sendAudio}>
                    <Btn style={{backgroundColor: '#00b894'}}><Icon name="headphones" size={20} color={'#fff'} /></Btn>
                    <Text noFont wieght={400}>Sound</Text>
                  </RowItem>
                  <RowItem onPress={() => setLocModalVisible(true)}>
                    <Btn style={{backgroundColor: '#e17055'}}><Icon name="pin" size={20} color={'#fff'} /></Btn>
                    <Text noFont wieght={400}>Location</Text>
                  </RowItem>
                  <RowItem onPress={sendFromCamera}>
                    <Btn style={{backgroundColor: '#fdcb6e'}}><Icon name="camera" size={20} color={'#fff'} /></Btn>
                    <Text noFont wieght={400}>Camera</Text>
                  </RowItem>
                </Row>
              </ActionsContainer>
            </MenuOptions>
          </Menu>
        }
        {(onRec && !value) &&
        <IconContainer onPress={deleteRecord} style={{marginRight: 6}}>
          <Icon size={19} name={"trash-outline"} color={'#e74c3c'} />
        </IconContainer>}
        <IconContainer onPress={onRec ? stopRecord : submit}>
          <Icon size={21} name={!value.length ? onRec ? "stop-circle-outline" : "mic-outline" : "paper-plane-outline"} color={onRec ? 'green' : theme.primary} />
        </IconContainer>
      </InputContainer>
      <LocationModal visible={locModalVisible} close={() => setLocModalVisible(false)} onSend={sendLocation} />
    </>
  )
};

export default withMenuContext(ChatInput);
