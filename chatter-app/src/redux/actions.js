import {
  BLOCK_USER,
  BLOCK_USER_SUCCESS,
  CLEAR_SENT_MESSAGE,
  CONVERSATION_REPLY,
  CONVERSATION_REPLY_SUCCESS,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  DELETE_CONVERSATION,
  DELETE_CONVERSATION_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  EXIT_CONVERSATION,
  EXIT_CONVERSATION_SUCCESS,
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  MUTE_CONVERSATION,
  MUTE_CONVERSATION_SUCCESS,
  REFRESH_CONVERSATION,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SET_SEEN_MESSAGES,
  SET_SEEN_MESSAGES_SUCCESS,
  UNBLOCK_USER,
  UNBLOCK_USER_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_GROUP_IMAGE_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS
} from "./constants";

export const login = data => ({type: LOGIN, data});
export const loginSuccess = payload => ({type: LOGIN_SUCCESS, payload});
export const loginError = error => ({type: LOGIN_ERROR, error});

export const register = data => ({type: REGISTER, data});
export const registerSuccess = payload => ({type: REGISTER_SUCCESS, payload});
export const registerError = error => ({type: REGISTER_ERROR, error});

export const getProfile = data => ({type: GET_PROFILE, data});
export const getProfileSuccess = payload => ({type: GET_PROFILE_SUCCESS, payload});

export const getConversations = data => ({type: GET_CONVERSATIONS, data});
export const getConversationsSuccess = payload => ({type: GET_CONVERSATIONS_SUCCESS, payload});

export const blockUser = data => ({type: BLOCK_USER, data});
export const blockUserSuccess = payload => ({type: BLOCK_USER_SUCCESS, payload});

export const unblockUser = data => ({type: UNBLOCK_USER, data});
export const unblockUserSuccess = payload => ({type: UNBLOCK_USER_SUCCESS, payload});

export const createConversation = data => ({type: CREATE_CONVERSATION, data});
export const createConversationSuccess = payload => ({type: CREATE_CONVERSATION_SUCCESS, payload});

export const createGroup = data => ({type: CREATE_GROUP, data});
export const createGroupSuccess = payload => ({type: CREATE_GROUP_SUCCESS, payload});

export const updateAvatarSuccess = payload => ({type: UPDATE_AVATAR_SUCCESS, payload});
export const updateProfileSuccess = payload => ({type: UPDATE_PROFILE_SUCCESS, payload});

export const updateProfile = data => ({type: UPDATE_PROFILE, data});

export const updateGroupImageSuccess = payload => ({type: UPDATE_GROUP_IMAGE_SUCCESS, payload});

export const updateGroupSuccess = payload => ({type: UPDATE_GROUP_SUCCESS, payload});

export const conversationReply = data => ({type: CONVERSATION_REPLY, data});
export const conversationReplySuccess = payload => ({type: CONVERSATION_REPLY_SUCCESS, payload});

export const setSeenMessages = data => ({type: SET_SEEN_MESSAGES, data});
export const setSeenMessagesSuccess = payload => ({type: SET_SEEN_MESSAGES_SUCCESS, payload});

export const muteConversation = data => ({type: MUTE_CONVERSATION, data});
export const muteConversationSuccess = payload => ({type: MUTE_CONVERSATION_SUCCESS, payload});

export const refreshConversation = payload => ({type: REFRESH_CONVERSATION, payload});

export const clearSentMessage = payload => ({type: CLEAR_SENT_MESSAGE, payload});

export const logout = () => ({type: LOGOUT});

export const deleteConversation = data => ({type: DELETE_CONVERSATION, data});
export const deleteConversationSuccess = payload => ({type: DELETE_CONVERSATION_SUCCESS, payload});
export const deleteMessageSuccess = payload => ({type: DELETE_MESSAGE_SUCCESS, payload});

export const exitConversation = data => ({type: EXIT_CONVERSATION, data});
export const exitConversationSuccess = payload => ({type: EXIT_CONVERSATION_SUCCESS, payload});
