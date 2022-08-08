import constants from "../config/constants";
import {IS_IOS} from "../config/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getAvatarPath(path, isGroup, q) {
  if (path) return {uri: (!path.includes('file') ? constants.bucket_url : '') + path + (q ? '?v=' + new Date() : '')};
  else return isGroup ? require('../images/group.png') : require('../images/user.png');
}

export function fixImgPath(path) {
  if (path?.includes('http') || path?.includes('file')) return path;
  else return constants.bucket_url + path;
}

export function sortConversations(a, b) {
  return new Date(b.message?.createdAt || b.createdAt) - new Date(a.message?.createdAt || a.createdAt)
}

export const getFileObj = (file) => {
  return {
    name: file.fileName,
    type: file.type,
    uri: IS_IOS ? file.uri.replace('file://', '') : file.uri,
  }
};

export const getUploadHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {"Content-Type": "multipart/form-data", Authorization: `Token ${token}`, Accept: 'application/json'};
};

export const mapMessageData = messages => {
  return messages.map(msg => ({
    ...msg,
    ...(msg.image ? {image: fixImgPath(msg.image)} : {}),
    ...(msg.video ? {video: fixImgPath(msg.video)} : {}),
    ...(msg.audio ? {audio: fixImgPath(msg.audio)} : {}),
    user: {...msg.user, ...(msg.user.avatar ? {avatar: fixImgPath(msg.user.avatar)} : {})}
  }));
};

export function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
