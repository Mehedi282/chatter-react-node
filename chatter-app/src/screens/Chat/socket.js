import io from "socket.io-client";
import constants from "../../config/constants";

let socket;
export const initiateSocket = (conversationId) => {
  socket = io(constants.base_url, {query: {conversationId}});
};

export const disconnectSocket = () => {
  if(socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (socket) socket.on('chat', cb);
};

export const sendMessage = (message) => {
  if (socket) socket.emit('chat', { message });
};

export const subscribeToUserTypingStatus = (cb) => {
  if (socket) socket.on('userTyping', cb);
};

export const userTyping = (status) => {
  if (socket) socket.emit('userTyping', status);
};
