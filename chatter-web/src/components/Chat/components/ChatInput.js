import React from 'react';
import {IconContainer, Input, InputContainer, Row, Btn, RowItem, ActionsContainer, IconBtn, InputWrapper} from "../styles";
import {Icon} from "../../index";
import {theme as themes} from '../../../config/theme';
import FileUpload from "../../FileUpload";
import {useOutsideAlerter} from "../../../utils/useOutsideAlerter";
import Api from "../../../config/axios";

const ChatInput = ({value, onChange, onSend, appendMessage, chatId, ...props}) => {
  const [actionsVisible, setActionsVisible] = React.useState(false);
  const theme = themes[props.mode];
  const actionsRef = React.useRef(null);
  useOutsideAlerter(actionsRef, () => setActionsVisible(false));

  const submit = React.useCallback(async () => {
    if (value) {
      sendMessage({text: value});
      onChange('');
    }
  }, [value]);

  const sendMessage = React.useCallback((data) => {
    appendMessage(data);
    onSend(chatId, data);
  }, [chatId]);

  const uploadFile = React.useCallback(async file => {
    const form = new FormData();
    form.append('file', file);
    const res = await Api.post('/chat/file', form);
    return res.data.path;
  }, []);

  const sendPicOrVideo = React.useCallback(async (source) => {
    const uri = URL.createObjectURL(source);
    setActionsVisible(false);
    const type = source.type.includes('image') ? 'image' : 'video';
    let data = {[type]: uri};
    appendMessage(data);
    data[type] = await uploadFile(source);
    onSend(chatId, data);
  }, []);
  const sendAudio = React.useCallback(async (source) => {
    setActionsVisible(false);
    const uri = URL.createObjectURL(source);
    appendMessage({audio: uri});
    setActionsVisible(false);
    const data = await uploadFile(source);
    onSend(chatId, {audio: data});
  }, []);

  const sendLocation = React.useCallback(async () => {
    await navigator.geolocation.getCurrentPosition(
      position => sendMessage({location: {latitude: position.coords.latitude, longitude: position.coords.longitude}}),
    );
    setActionsVisible(false)
  }, []);

  return (
    <InputWrapper>
      <InputContainer>
        <Input
          value={value}
          placeholder={"Message"}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <IconBtn onClick={() => setActionsVisible(true)}>
          <Icon size={21} name="attach-outline" color={theme.gray} />
        </IconBtn>
        <IconContainer onClick={submit}>
          <Icon size={21} name={"paper-plane-outline"} color={theme.primary} />
        </IconContainer>
      </InputContainer>
      {actionsVisible &&
      <ActionsContainer ref={actionsRef}>
        <Row>
          <FileUpload accept="image/*,video/*" onChange={sendPicOrVideo}>
            <RowItem>
              <Btn style={{backgroundColor: '#0984e3'}}><Icon name="image" size={20} color={'#fff'} /></Btn>
              Gallery
            </RowItem>
          </FileUpload>
          <FileUpload accept="audio/*" onChange={sendAudio}>
            <RowItem>
              <Btn style={{backgroundColor: '#00b894'}}><Icon name="headphones" size={20} color={'#fff'} /></Btn>
              Sound
            </RowItem>
          </FileUpload>
          <RowItem onClick={sendLocation}>
            <Btn style={{backgroundColor: '#e17055'}}><Icon name="pin" size={20} color={'#fff'} /></Btn>
            Location
          </RowItem>
        </Row>
      </ActionsContainer>
      }
    </InputWrapper>
  )
};

export default ChatInput;
