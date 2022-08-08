import React from 'react';
import {theme} from "../../config/theme";
import {ThemeProvider} from "styled-components";
import {Chat, Profile, Sidebar} from "../../components";
import {Container} from "./styles";
import {useNavigate, useOutletContext} from "react-router-dom";
import Api from "../../config/axios";
import {LoadScript} from "@react-google-maps/api";
import constants from "../../config/constants";
import {createChat, disconnectSocket, initiateSocket, newChat, refreshMessages, setOffline, setOnline} from "./socket";
import Spinner from "../../components/Spinner";
import {CenteredContent} from "../../utils/sharedStyles";
import {useBeforeunload} from 'react-beforeunload';


function ChatRoom() {
  const [loading, setLoading] = React.useState(true);
  const [mode, setMode] = useOutletContext();
  const [user, setUser] = React.useState({});
  const [conversations, setConversations] = React.useState([]);
  const [chatId, setChatId] = React.useState('');
  const [chatData, setChatData] = React.useState({});
  const [profile, setProfile] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData();
    return () => {disconnectSocket()}
  }, []);
  const fetchData = React.useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      Api.setToken(token);
      const user = (await Api.get('/user')).data;
      if (!user) {
        localStorage.removeItem('token');
        navigate('/app/login');
        return;
      }
      const conversations = (await Api.get('/chat/conversation')).data.data;
      setUser(user);
      setConversations(conversations);
      setOnline(user._id);
      setLoading(false);
    } else
      navigate('/app/login');
  }, []);

  useBeforeunload(() => {setOffline(user._id)});

  React.useEffect(() => {
    fetchChatData()
  }, [chatId]);
  const fetchChatData = React.useCallback(async () => {
    if (chatId) {
      const res = await Api.get('/chat/conversation/' + chatId);
      setChatData(res.data);
    }
  }, [chatId]);

  React.useEffect(() => {
    if (user._id) {
      initiateSocket(user._id);
      refreshMessages(data => {
        setConversations(state => state.map(c => c._id === data.conversationId ?
          ({...c, message: data, unseenMessageLength: (c.unseenMessageLength||0)+1}) : c));
      });
      newChat(data => {
        setConversations(state => [data, ...state])
      });
    }
  }, [user._id]);

  const updateLastMessage = React.useCallback((id, message) => {
    setConversations(state => state.map(c => c._id === id ? {...c, message} : c))
  }, []);

  const setSeenMessages = React.useCallback((data) => {
    setConversations(state => state.map(c => c._id === data.conversationId ?
      ({...c, message: {...c.message, seenBy: [...(c.message?.seenBy || []), data.userId]}, unseenMessageLength: 0}) : c))
  }, []);

  const createConversation = React.useCallback((newChat) => {
    setConversations(state => [newChat, ...state]);
    createChat(newChat);
  }, []);

  const setThemeMode = React.useCallback(val => {
    setMode(val);
    localStorage.setItem('mode', val);
  }, []);

  return (
    <ThemeProvider theme={mode === 'dark' ? theme.dark : theme.light}>
      <Container>
        {loading ? <CenteredContent className="loading"><Spinner/></CenteredContent>:
          <>
            <Sidebar user={user} conversations={conversations} setConversations={setConversations} setChatId={setChatId} createChat={createConversation} />
            {chatData._id &&
            <LoadScript googleMapsApiKey={constants.maps_api}>
              <Chat
                updateLastMessage={updateLastMessage}
                setSeenMessages={setSeenMessages}
                setProfile={setProfile}
                data={chatData}
                user={user}
                mode={mode}
                setMode={setThemeMode}
              />
            </LoadScript>
            }
            {profile ? <Profile id={profile} setProfile={setProfile} /> : null}
          </>
        }
      </Container>
    </ThemeProvider>
  )
}

export default ChatRoom;
