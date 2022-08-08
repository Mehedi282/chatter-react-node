import produce from 'immer';
import {
  BLOCK_USER_SUCCESS,
  CLEAR_SENT_MESSAGE,
  CONVERSATION_REPLY_SUCCESS,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_GROUP_SUCCESS,
  DELETE_CONVERSATION_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  EXIT_CONVERSATION_SUCCESS,
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  MUTE_CONVERSATION_SUCCESS,
  REFRESH_CONVERSATION,
  REGISTER_SUCCESS,
  SET_SEEN_MESSAGES_SUCCESS,
  UNBLOCK_USER_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_GROUP_IMAGE_SUCCESS,
  UPDATE_GROUP_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from "./constants";

export const initialState = {
  user: {
    loading: false,
    isLogin: false,
    data: {},
    error: null
  },
  conversations: {
    loading: false,
    data: []
  },
  sentMessage: null
};

export default function (state = initialState, action = {}) {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user.loading = true;
        break;
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
      case GET_PROFILE_SUCCESS:
        draft.user = {loading: false, isLogin: true, data: action.payload, error: null};
        break;
      case LOGIN_ERROR:
        draft.user = {loading: false, error: action.error, data: {}};
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.user.data = {...state.user.data, ...action.payload};
        break;
      case UPDATE_AVATAR_SUCCESS:
        draft.user.data.avatar = action.payload;
        break;
      case GET_CONVERSATIONS:
        draft.conversations.loading = true;
        break;
      case GET_CONVERSATIONS_SUCCESS:
        draft.conversations = {loading: false, data: action.payload};
        break;
      case CREATE_CONVERSATION_SUCCESS:
        draft.conversations.data.unshift(action.payload.conversation);
        if (action.payload.user) draft.user.data.contacts.push(action.payload.user);
        break;
      case CREATE_GROUP_SUCCESS:
        draft.conversations.data.unshift(action.payload);
        break;
      case CONVERSATION_REPLY_SUCCESS:
        draft.conversations.data = state.conversations.data.map(c => c._id === action.payload.message.conversationId ?
          ({...c, message: action.payload.message}) : c);
        draft.sentMessage = action.payload.message;
        break;
      case CLEAR_SENT_MESSAGE:
        draft.sentMessage = null;
        break;
      case REFRESH_CONVERSATION:
        draft.conversations.data = state.conversations.data.map(c => c._id === action.payload.conversationId ?
          ({...c, message: action.payload, unseenMessageLength: (c.unseenMessageLength || 0) + 1}) : c);
        break;
      case SET_SEEN_MESSAGES_SUCCESS:
        draft.conversations.data = state.conversations.data.map(c => c._id === action.payload.conversationId ?
          ({...c, message: {...c.message, seenBy: [...(c.message?.seenBy || []), action.payload.userId]}, unseenMessageLength: 0}) : c);
        break;
      case UPDATE_GROUP_IMAGE_SUCCESS:
        const index = state.conversations.data.findIndex(x => x._id === action.payload.conversationId);
        draft.conversations.data[index].image = action.payload.path;
        break;
      case UPDATE_GROUP_SUCCESS:
        const conIndex = state.conversations.data.findIndex(x => x._id === action.payload.conversationId);
        draft.conversations.data[conIndex].name = action.payload.name;
        break;
      case DELETE_CONVERSATION_SUCCESS:
      case EXIT_CONVERSATION_SUCCESS:
        draft.conversations.data = state.conversations.data.filter(x => x._id !== action.payload);
        break;
      case BLOCK_USER_SUCCESS:
        draft.user.data.blocked.push(action.payload);
        break;
      case UNBLOCK_USER_SUCCESS:
        draft.user.data.blocked = state.user.data.blocked.filter(x => x._id !== action.payload._id);
        break;
      case MUTE_CONVERSATION_SUCCESS:
        const conversationIndex = state.conversations.data.findIndex(x => x._id === action.payload.conversationId);
        if (action.payload.isMuted)
          draft.conversations.data[conversationIndex].mutedBy = state.conversations.data[conversationIndex].mutedBy.filter(x => x !== state.user.data._id);
        else draft.conversations.data[conversationIndex].mutedBy.push(state.user.data._id);
        break;
      case DELETE_MESSAGE_SUCCESS:
        const conId = state.conversations.data.findIndex(x => x._id === action.payload.conversationId);
        draft.conversations.data[conId].message = action.payload.message;
        break;
      case LOGOUT:
        return {...initialState};
    }
  });
}
