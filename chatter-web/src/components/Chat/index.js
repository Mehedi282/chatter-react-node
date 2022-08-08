import React from 'react';
import {ChatContainer, ChatContent, Header, HeaderAvatar, LoadBtn, MessageText, StatusTxt} from "./styles";
import {getAvatarPath, mapMessageData} from "../../utils/helpers";
import {Avatar, Bubble, GiftedChat} from "react-native-gifted-chat";
import LocationMessage from "./components/LocationMessage";
import {getBubbleProps} from "./components/bubbleProps";
import {theme} from "../../config/theme";
import ChatInput from "./components/ChatInput";
import Api from '../../config/axios';
import {CenteredContent, Row} from "../../utils/sharedStyles";
import {disconnectSocket, initiateSocket, sendMessage, subscribeToChat, subscribeToUserTypingStatus, userTyping} from "./socket";
import VideoMessage from "./components/VideoMessage";
import AudioMessage from "./components/AudioMessage";
import {Spinner, Switch} from '../index'
import {checkRecipientOnline, removeListeners, subscribeToOffline, subscribeToOnline, subscribeToRecipientOnlineStatus} from "../../pages/ChatRoom/socket";
let timeout;

function Chat({data, user, mode, ...props}) {
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [isGroup, setIsGroup] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupImage, setGroupImage] = React.useState('');
  const [recipient, setRecipient] = React.useState();
  const [recipients, setRecipients] = React.useState([]);
  const [isReady, setIsReady] = React.useState(false);
  const [loadingMoreMsg, setLoadingMoreMsg] = React.useState(false);
  const [noMoreMsg, setNoMoreMsg] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [isOnline, setIsOnline] = React.useState(false);
  const [recipientTyping, setRecipientTyping] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    setIsReady(false);
    setMessages([]);
    setMessage('');
    setIsGroup(false);
    setGroupName('');
    setGroupImage('');
    setRecipient();
    setRecipients([]);
    setLoadingMoreMsg(false);
    setNoMoreMsg(false);
    setPage(0);
    setData();
  }, [data]);
  const setData = React.useCallback(async () => {
    if (data._id) {
      removeListeners(['userOnline', 'userOffline']);
      disconnectSocket();
      initiateSocket(data._id);
      subscribeToChat(data => {
        if (data.message) {
          setMessages(oldChats =>[data.message, ...oldChats]);
          setSeenMessages([data.message._id]);
        }
      });
      if (!data.isGroup) {
        const recipientUser = data.users.find(x => x._id !== user._id);
        setRecipient(recipientUser);
        subscribeToOnline(recipientUser._id, () => setIsOnline(true));
        subscribeToOffline(recipientUser._id, () => setIsOnline(false));
        subscribeToUserTypingStatus(status => setRecipientTyping(status));
        subscribeToRecipientOnlineStatus(status => setIsOnline(status));
        checkRecipientOnline(recipientUser._id);
      }
      else {
        setRecipients(data.users.filter(x => x._id !== user._id));
        setGroupName(data.name);
        setGroupImage(data.image);
        setIsGroup(true);
      }
      setMessages(data.messages || []);
      const unseenMessages = data.messages.filter(m => m.user !== user._id && !m.seenBy?.includes(user._id)).map(m => m._id);
      setSeenMessages(unseenMessages);
      setIsReady(true);
    }
  }, [data]);

  const setSeenMessages = React.useCallback(async (messageIds) => {
    const reqData = {messageIds, conversationId: data._id, userId: user._id};
    await Api.put('/chat/conversation/set-seen-messages', {messageIds});
    props.setSeenMessages(reqData);
  }, [data, user]);

  const messagesData = React.useMemo(() => mapMessageData(messages), [messages]);

  const onSend = React.useCallback(async (id, message) => {
    const res = await Api.post('/chat/conversation/reply/' + id, {messageData: {...message}});
    props.updateLastMessage(id, res.data.message);
    setMessages(messages => messages.map((msg, i) => i === 0 ? res.data.message : msg));
    sendMessage({...res.data.message, recipientIds: isGroup ? recipients.map(r => r._id) : [recipient._id]});
  }, [isGroup, recipients, recipient, data]);

  const onChangeTimeoutFunc = React.useCallback(() => {
    setIsTyping(false);
    userTyping(false);
  }, []);
  React.useEffect(() => {
    if (message && isOnline) {
      if(!isTyping) {
        setIsTyping(true);
        userTyping(true);
        timeout = setTimeout(onChangeTimeoutFunc, 1500);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(onChangeTimeoutFunc, 1500);
      }
    }
  }, [message]);

  const appendMessage = React.useCallback((message) => {
    setMessages(previousMessages => [{
      _id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10),
      ...message,
      createdAt: new Date(),
      user: {_id: user._id, name: user.name, avatar: user.avatar},
    }, ...previousMessages]);
  }, [user, recipients, isGroup, recipient]);

  const deleteMessage = React.useCallback(async (message) => {
    if (message.user._id === user._id) {
      await Api.delete('/chat/conversation/message/' + message._id);
      setMessages(messages => messages.filter(msg => msg._id !== message._id));
      const isLastMsg = messages.findIndex(m => m._id === message._id) === 0;
      if (isLastMsg) props.updateLastMessage(data._id, messages[1]);
    }
  }, [user._id, messages, data._id]);

  const onBubbleLongPress = React.useCallback((context, message) => {
    const options = ['Cancel'];
    if (message.user._id === user._id) options.unshift('Delete Message');
    if (options.length > 1) {
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({options, cancelButtonIndex}, async (buttonIndex) => {
        if (buttonIndex === 0) deleteMessage(message);
      });
    }
  }, [messages, data._id]);

  const loadMore = React.useCallback(async () => {
    const newPage = page + 1;
    setLoadingMoreMsg(true);
    const res = await Api.get(`/chat/conversation/${data._id}/messages?page=${newPage}`);
    setMessages(state => [...state, ...res.data.messages]);
    setLoadingMoreMsg(false);
    setPage(newPage);
    if (!res.data.messages.length) setNoMoreMsg(true);
  }, [page]);

  const renderLoadMoreBtn = React.useMemo(() => (messages.length > 19 && !noMoreMsg) ?
    <LoadBtn onClick={loadMore} disabled={loadingMoreMsg}>{loadingMoreMsg ? <Spinner size={25} color="#fff"/> : 'Load more'}</LoadBtn>
    : null, [messages, loadingMoreMsg, noMoreMsg, page]);

  if (!isReady) return <CenteredContent className="loading"><Spinner/></CenteredContent>;
  return (
    <ChatContainer>
      <Header>
        <Row align="center" onClick={() => !isGroup && props.setProfile(recipient._id)}>
          <HeaderAvatar src={getAvatarPath(isGroup ? groupImage : recipient.avatar, isGroup)} />
          <div>
            {isGroup ? groupName : recipient.name}
            {!isGroup && recipientTyping ? <StatusTxt>Typing...</StatusTxt> : isOnline ? <StatusTxt>Online</StatusTxt> : null}
          </div>
        </Row>
        <Switch onChange={() => props.setMode(mode === 'dark' ? 'light' : 'dark')} checked={mode === 'dark'} checkedIcon={false} height={25} uncheckedIcon={false} />
      </Header>
      <ChatContent>
        <GiftedChat
          messages={messagesData}
          user={{_id: user._id}}
          minInputToolbarHeight={60}
          renderBubble={props => {
            if (props.currentMessage.location) return <LocationMessage location={props.currentMessage.location} messagePosition={props.position} />;
            if (props.currentMessage.audio) return <AudioMessage src={props.currentMessage.audio} />;
            else {
              const allProps = {...props, ...getBubbleProps(theme[mode]), onLongPress: onBubbleLongPress};
              return <Bubble {...allProps} />;
            }
          }}
          renderMessageText={props => <MessageText right={props.position === 'right'}>{props.currentMessage.text}</MessageText>}
          renderAvatar={props => <Avatar {...props} containerStyle={{left: {top: -10, marginRight: 0}}} />}
          renderInputToolbar={() => <ChatInput value={message} onChange={setMessage} onSend={onSend} appendMessage={appendMessage} chatId={data._id} mode={mode} />}
          renderMessageVideo={props => <VideoMessage src={props.currentMessage.video}/>}
          listViewProps={{ListFooterComponent: renderLoadMoreBtn}}
          extraData={[mode]}
          shouldUpdateMessage={(props, nextProps) => props.extraData[0] !== nextProps.extraData[0]}
        />
      </ChatContent>
    </ChatContainer>
  )
}

export default Chat;
