import React from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {GiftedChat, Bubble, Avatar, Message} from 'react-native-gifted-chat'
import {getTheme} from "../../config/theme";
import {theme as themeStyle} from "../../config/theme";
import {AudioPlayer, ChatInput, Header, LocationMessage, Icon, Loading} from "../../components";
import {getBubbleProps, renderVideoMessage} from "./config";
import {useDispatch, useSelector} from "react-redux";
import {Api} from "../../config";
import {blockUser, clearSentMessage, conversationReply, deleteConversation, deleteMessageSuccess, muteConversation, setSeenMessages} from "../../redux/actions";
import {disconnectSocket, initiateSocket, sendMessage, subscribeToChat, subscribeToUserTypingStatus, userTyping} from "./socket";
import {checkRecipientOnline, subscribeToOffline, subscribeToOnline, subscribeToRecipientOnlineStatus} from "../Home/socket";
import {getAvatarPath, mapMessageData} from "../../utils/helpers";
import {Content, Name, Avatar as HeaderAvatar, StatusTxt} from "../../components/Header/styles";
import {LoadBtn, LoadBtnTxt} from "./styles";
let timeout;

const Chat = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [messages, setMessages] = React.useState([]);
  const [isGroup, setIsGroup] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [groupImage, setGroupImage] = React.useState('');
  const [recipient, setRecipient] = React.useState(false);
  const [recipients, setRecipients] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [isMuted, setIsMuted] = React.useState(false);
  const [loadingMoreMsg, setLoadingMoreMsg] = React.useState(false);
  const [noMoreMsg, setNoMoreMsg] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [recipientTyping, setRecipientTyping] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const theme = getTheme();
  const dispatch = useDispatch();
  const conversationId = React.useMemo(() => props.route.params?.conversation._id, []);
  const [currentAudioId, setCurrentAudioId] = React.useState('');
  const menuItems = React.useMemo(() => [
    {value: 1, label: 'Media', onPress: () => props.navigation.navigate('MediaManager', {conversationId})},
    {value: 2, label: `${isMuted ? 'Unmute' : 'Mute'} notifications`, onPress: () => {dispatch(muteConversation({conversationId, isMuted}));setIsMuted(!isMuted)}},
    ...(!isGroup ? [
      {value: 3, label: 'Block user', onPress: () => block()},
      {value: 4, label: 'Delete', onPress: () => {dispatch(deleteConversation(conversationId)); props.navigation.goBack()}},
    ] : []),
  ], [isGroup, recipient, conversationId, isMuted]);
  const user = useSelector(state => state.main.user.data);
  const sentMessage = useSelector(state => state.main.sentMessage);

  React.useEffect(() => {
    const conversation = props.route.params?.conversation;
    if (conversation._id) {
      if (!props.route.params?.noInitialData) setInitialData(conversation);
      fetchData(conversation._id);
      initiateSocket(conversation._id);
      subscribeToChat(data => {
        if (data.message) {
          setMessages(oldChats =>[data.message, ...oldChats]);
          dispatchSetSeenMessages([data.message._id]);
        }
      });
      subscribeToUserTypingStatus(status => setRecipientTyping(status));
      subscribeToRecipientOnlineStatus(status => setIsOnline(status));
    }
    return () => {disconnectSocket()}
  }, []);

  const fetchData = React.useCallback(async (conversationId) => {
    const res = await Api.get('/chat/conversation/' + conversationId);
    setInitialData(res.data, true);
    setLoading(false);
    setMessages(res.data.messages || []);
    const unseenMessages = res.data.messages.filter(m => m.user !== user._id && !m.seenBy?.includes(user._id)).map(m => m._id);
    dispatchSetSeenMessages(unseenMessages);
    setIsMuted(res.data.mutedBy?.includes(user._id));
  }, [user._id]);
  const dispatchSetSeenMessages = React.useCallback((messageIds) => {
    dispatch(setSeenMessages({messageIds, conversationId: props.route.params?.conversation._id, userId: user._id}));
  }, [user]);

  const setInitialData = React.useCallback((data, socket) => {
    if (!data.isGroup) {
      const recipientUser = data.users.find(x => x._id !== user._id);
      setRecipient(recipientUser);
      if (socket && recipientUser._id) {
        checkRecipientOnline(recipientUser._id);
        subscribeToOnline(recipientUser._id, () => {setIsOnline(true)});
        subscribeToOffline(recipientUser._id, () => {setIsOnline(false)});
      }
    }
    else {
      setRecipients(data.users.filter(x => x._id !== user._id));
      setGroupName(data.name);
      if (data.image) setGroupImage(data.image);
      setIsGroup(true);
    }
  }, [user]);

  const block = React.useCallback(() => {
    dispatch(blockUser(recipient));
    props.navigation.goBack();
  }, [recipient]);

  const appendMessage = React.useCallback((message, cb) => {
    const tempId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    setMessages(previousMessages => [{
      _id: tempId,
      ...message,
      createdAt: new Date(),
      user: {_id: user._id, name: user.name, avatar: user.avatar},
    }, ...previousMessages]);
    if (cb) cb(tempId);
  }, [user, recipients, isGroup, recipient]);

  const onSend = React.useCallback((message) => {
    const dbData = {conversationId, messageData: {...message}};
    dispatch(conversationReply(dbData));
  }, [conversationId]);

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

  React.useEffect(() => {
    if (sentMessage) {
      setMessages(messages => messages.map((msg, i) => i === 0 ? sentMessage : msg));
      sendMessage({...sentMessage, recipientIds: isGroup ? recipients.map(r => r._id) : [recipient._id]});
      dispatch(clearSentMessage());
    }
  }, [sentMessage, isGroup, recipients, recipient]);

  const deleteMessage = React.useCallback(async (message) => {
    if (message.user._id === user._id) {
      await Api.delete('/chat/conversation/message/' + message._id);
      setMessages(messages => messages.filter(msg => msg._id !== message._id));
      const msgPos = messages.findIndex(m => m._id === message._id) + 1;
      if (messages.length === msgPos) deleteMessageSuccess({conversationId, lastMsg: messages[messages.length-2]});
    }
  }, [user._id]);

  const onBubbleLongPress = React.useCallback((context, message) => {
    const options = ['Cancel'];
    if (message.user._id === user._id) options.unshift('Delete Message');
    if (options.length > 1) {
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({options, cancelButtonIndex}, async (buttonIndex) => {
        if (buttonIndex === 0) deleteMessage(message);
      });
    }
  }, []);

  const bubbleProps = React.useMemo(() => ({...getBubbleProps(theme), onLongPress: onBubbleLongPress}), [theme]);

  const navigateProfile = React.useCallback(() => {
    if (!isGroup)
      props.navigation.navigate('UserProfile', {...recipient, conversationId});
    else
      props.navigation.navigate('GroupProfile', {_id: conversationId, image: groupImage, name: groupName});
  }, [isGroup, groupImage, groupName, recipient, conversationId]);

  const updateMessageData = React.useCallback((id, data) => {
    setMessages(messages => messages.map(m => m._id === id ? ({...m, ...data}) : m))
  }, []);

  const loadMore = React.useCallback(async () => {
    const newPage = page + 1;
    setLoadingMoreMsg(true);
    const res = await Api.get(`/chat/conversation/${conversationId}/messages?page=${newPage}`);
    setMessages(state => [...state, ...res.data.messages]);
    setLoadingMoreMsg(false);
    setPage(newPage);
    if (!res.data.messages.length) setNoMoreMsg(true);
  }, [page]);

  const messagesData = React.useMemo(() => mapMessageData(messages), [messages]);

  const renderLoadMoreBtn = React.useMemo(() => (messages.length > 19 && !noMoreMsg) ?
    <LoadBtn onPress={loadMore} disabled={loadingMoreMsg}>{loadingMoreMsg ? <ActivityIndicator size="small" color="#fff"/> : <LoadBtnTxt>Load more</LoadBtnTxt> }</LoadBtn>
    : null, [messages, loadingMoreMsg, noMoreMsg, page]);

  return (
    <>
      <Header {...props} chat menuItems={menuItems} chatData={isGroup ? {name: groupName, avatar: groupImage} : recipient} isGroup={isGroup}
        chatTitle={
          <Content>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon size={33} height={40} name="chevron-left-outline" />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={navigateProfile}>
              <HeaderAvatar source={getAvatarPath(isGroup ? groupImage : recipient.avatar, isGroup)} />
              <View>
                <Name noFont>{isGroup ? groupName : recipient.name}</Name>
                {!isGroup && recipientTyping ? <StatusTxt>Typing...</StatusTxt> : isOnline ? <StatusTxt>Online</StatusTxt> : null}
              </View>
            </TouchableOpacity>
          </Content>
        }
      />
      {loading ? <Loading/> :
        <View style={themeStyle.body}>
          <GiftedChat
            messages={messagesData}
            user={{_id: user._id}}
            minInputToolbarHeight={60}
            renderMessageVideo={renderVideoMessage}
            renderMessage={props => {
              if (props.currentMessage.audio)
                return <AudioPlayer {...props} currentAudioId={currentAudioId} you={(props.currentMessage._id === currentAudioId).toString()} setCurrentAudioId={setCurrentAudioId} />;
              return <Message {...props} />;
            }}
            renderBubble={props => {
              if (props.currentMessage.location) return <LocationMessage location={props.currentMessage.location} messagePosition={props.position} />;
              else {
                const allProps = {...props, ...bubbleProps};
                return <Bubble {...allProps} />;
              }
            }}
            renderAvatar={props => <Avatar {...props} containerStyle={{left: {top: -10, marginRight: 0}}} />}
            renderInputToolbar={() => <ChatInput value={message} onChange={setMessage} onSend={onSend} appendMessage={appendMessage} updateMessageData={updateMessageData} />}
            extraChatData={{currentAudioId}}
            listViewProps={{ListFooterComponent: renderLoadMoreBtn}}
          />
        </View>
      }
    </>
  )
};

export default Chat;
