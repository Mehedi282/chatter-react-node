import {put, call, takeLatest} from 'redux-saga/effects';
import {
  blockUserSuccess,
  conversationReplySuccess,
  createConversationSuccess,
  createGroupSuccess,
  deleteConversationSuccess,
  exitConversationSuccess,
  getConversationsSuccess,
  getProfileSuccess,
  loginError,
  loginSuccess,
  muteConversationSuccess,
  registerError,
  registerSuccess,
  setSeenMessagesSuccess,
  unblockUserSuccess,
  updateAvatarSuccess,
  updateGroupImageSuccess,
  updateProfileSuccess
} from './actions';
import {
  BLOCK_USER,
  CONVERSATION_REPLY,
  CREATE_CONVERSATION,
  CREATE_GROUP,
  DELETE_CONVERSATION,
  EXIT_CONVERSATION,
  GET_CONVERSATIONS,
  GET_PROFILE,
  LOGIN,
  MUTE_CONVERSATION,
  REGISTER,
  SET_SEEN_MESSAGES,
  UNBLOCK_USER,
  UPDATE_AVATAR,
  UPDATE_GROUP_IMAGE,
  UPDATE_PROFILE
} from "./constants";

import {Api} from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {navigate, replace} from "../config/Navigator";
import {createChat} from "../screens/Home/socket";
import {getFileObj} from "../utils/helpers";
import constants from "../config/constants";
import {setNotificationUserId} from "../config/NotificationService";
import {Alert} from "react-native";

export function* loginRequest(action) {
  try {
    const res = yield call(Api.post, '/user/login', action.data);
    AsyncStorage.setItem('token', res.data.token);
    yield call(Api.setToken, res.data.token);
    yield put(loginSuccess(res.data));
    replace('Home');
    setNotificationUserId(res.data._id);
  } catch (e) {
    alert(e.response.data.message);
    yield put(loginError(e));
  }
}

export function* register(action) {
  try {
    const res = yield call(Api.post, '/user', action.data);
    AsyncStorage.setItem('token', res.data.token);
    yield call(Api.setToken, res.data.token);
    yield put(registerSuccess(res.data));
    replace('Home');
    setNotificationUserId(res.data._id);
  } catch (e) {
    alert(e.response.data.message);
    yield put(registerError(e));
  }
}

export function* getProfile(action) {
  const res = yield call(Api.get, '/user');
  if (res.data) {
    yield put(getProfileSuccess(res.data));
  } else {
    AsyncStorage.removeItem('token');
    replace('Login');
  }
}

export function* updateProfile(action) {
  const res = yield call(Api.put, '/user', action.data);
  yield put(updateProfileSuccess(res.data));
}

export function* updateAvatar(action) {
  const res = yield call(Api.post, '/user/avatar', action.data, {headers: {test: "123","Content-Type": "multipart/form-data"}});
  yield put(updateAvatarSuccess(res.data.path));
}

export function* getConversations() {
  const res = yield call(Api.get, '/chat/conversation');
  yield put(getConversationsSuccess(res.data.data));
}

export function* createConversation(action) {
  const res = yield call(Api.post, '/chat/conversation/' + action.data._id);
  yield put(createConversationSuccess({conversation: res.data, user: action.data}));
  createChat(res.data);
  navigate('Chat', {conversation: res.data});
}

export function* conversationReply(action) {
  const res = yield call(Api.post, '/chat/conversation/reply/' + action.data.conversationId, action.data);
  yield put(conversationReplySuccess(res.data));
}

export function* muteConversation(action) {
  const data = {isMuted: action.data.isMuted, conversationId: action.data.conversationId};
  yield call(Api.put, '/chat/conversation/' + action.data.conversationId + '/muteUnmute', data);
  yield put(muteConversationSuccess(data));
  Alert.alert('', `Chat ${action.data.isMuted ? 'unmuted' : 'muted'}`);
}

export function* setSeenMessages(action) {
  if (!!action.data.messageIds.length) {
    yield call(Api.put, '/chat/conversation/set-seen-messages', {messageIds: action.data.messageIds});
    yield put(setSeenMessagesSuccess(action.data))
  }
}

export function* createGroup(action) {
  const {name, participants, groupImage} = action.data;
  const res = yield call(Api.post, '/chat/group-conversation', {name, participants});
  yield put(createGroupSuccess(res.data));
  const chatData = {...res.data, image: groupImage?.uri};
  navigate('Chat', {conversation: chatData});
  if (groupImage) {
    yield put(updateGroupImageSuccess({conversationId: res.data._id, path: groupImage.uri}));
    let data = new FormData();
    data.append('image', getFileObj(groupImage));
    const token = yield call(AsyncStorage.getItem, 'token');
    let obj = {method: 'PUT', headers: {"Content-Type": "multipart/form-data", Authorization: `Token ${token}`, Accept: 'application/json'}, body: data};
    const imgReq = yield call(fetch, constants.base_url + `/api/v1/chat/conversation/group/${res.data._id}/image`, obj);
    const imgRes = yield imgReq.json();
    createChat({...res.data, image: imgRes.path});
  } else
    createChat(chatData);
}

export function* updateGroupImage(action) {
  const res = yield call(Api.put, `/chat/group/${action.data.id}/image`, action.data.data);
  yield put(updateGroupImageSuccess(res.data.path));
}

export function* blockUser(action) {
  yield call(Api.put, '/user/block/' + action.data._id);
  yield put(blockUserSuccess(action.data));
}

export function* unblockUser(action) {
  yield call(Api.put, '/user/unblock/' + action.data._id);
  yield put(unblockUserSuccess(action.data));
}

export function* exitConversation(action) {
  navigate('Home');
  yield call(Api.put, '/chat/conversation/group/' + action.data + '/exit');
  yield put(exitConversationSuccess(action.data));
}

export function* deleteConversation(action) {
  navigate('Home');
  yield call(Api.delete, '/chat/conversation/' + action.data);
  yield put(deleteConversationSuccess(action.data));
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, register);
  yield takeLatest(GET_PROFILE, getProfile);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeLatest(UPDATE_AVATAR, updateAvatar);
  yield takeLatest(GET_CONVERSATIONS, getConversations);
  yield takeLatest(CONVERSATION_REPLY, conversationReply);
  yield takeLatest(SET_SEEN_MESSAGES, setSeenMessages);
  yield takeLatest(CREATE_GROUP, createGroup);
  yield takeLatest(UPDATE_GROUP_IMAGE, updateGroupImage);
  yield takeLatest(BLOCK_USER, blockUser);
  yield takeLatest(UNBLOCK_USER, unblockUser);
  yield takeLatest(CREATE_CONVERSATION, createConversation);
  yield takeLatest(MUTE_CONVERSATION, muteConversation);
  yield takeLatest(EXIT_CONVERSATION, exitConversation);
  yield takeLatest(DELETE_CONVERSATION, deleteConversation);
}
