import io from "socket.io-client";
import constants from "../../config/constants";

let socket;
export const initiateSocket = (userId) => {
  socket = io(constants.base_url, {query: {userId}});
};

export const disconnectSocket = () => {
  if(socket) socket.disconnect();
};

export const refreshMessages = (cb) => {
  if (socket) socket.on('refreshConversation', cb);
};

export const createChat = (data) => {
  if (socket) socket.emit('createChat', data);
};

export const newChat = (cb) => {
  if (socket) socket.on('newChat', cb);
};

export const checkRecipientOnline = (recipientId) => {
  if (socket) socket.emit('isRecipientOnline', recipientId);
};

export const subscribeToRecipientOnlineStatus = (cb) => {
  if (socket) socket.on('isRecipientOnline', cb);
};

export const subscribeToOffline = (id, cb) => {
  if (socket) socket.on('userOffline', userId => {
    if (userId === id) cb();
  });
};

export const subscribeToOnline = (id, cb) => {
  if (socket) socket.on('userOnline', userId => {
    if (userId === id) cb();
  });
};

export const setOffline = userId => {
  if (socket) socket.emit('offline', userId);
};

export const setOnline = userId => {
  if (socket) socket.emit('online', userId);
};

export const qrLogin = data => {
  if (socket) socket.emit('qrLogin', data);
};
