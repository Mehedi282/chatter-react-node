import constants from "../config/constants";

export function getAvatarPath(path, isGroup, q) {
  if (path) return (!path.includes('file') ? constants.bucket_url : '') + path + (q ? '?v=' + new Date() : '');
  else return isGroup ? require('../images/group.png') : require('../images/user.png');
}

export function fixImgPath(path) {
  if (path?.includes('http') || path?.includes('file')) return path;
  else return constants.bucket_url + path;
}

export function sortConversations(a, b) {
  return new Date(b.message?.createdAt || b.createdAt) - new Date(a.message?.createdAt || a.createdAt)
}

export const mapMessageData = messages => {
  return messages.map(msg => ({
    ...msg,
    ...(msg.image ? {image: fixImgPath(msg.image)} : {}),
    ...(msg.video ? {video: fixImgPath(msg.video)} : {}),
    ...(msg.audio ? {audio: fixImgPath(msg.audio)} : {}),
    user: {...msg.user, ...(msg.user.avatar ? {avatar: fixImgPath(msg.user.avatar)} : {})}
  }));
};

export function randomStr(length = 20) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function detectBrowser() {
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 ) {
    return 'Opera';
  } else if(navigator.userAgent.indexOf("Chrome") !== -1 ) {
    return 'Chrome';
  } else if(navigator.userAgent.indexOf("Safari") !== -1) {
    return 'Safari';
  } else if(navigator.userAgent.indexOf("Firefox") !== -1 ){
    return 'Firefox';
  } else if((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode === true )) {
    return 'IE';
  } else {
    return 'Unknown';
  }
}

export function getOsName() {
  let OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows NT 10.0")!== -1) OSName="Windows 10";
  if (window.navigator.userAgent.indexOf("Windows NT 6.3") !== -1) OSName="Windows 8.1";
  if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) OSName="Windows 8";
  if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) OSName="Windows 7";
  if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1) OSName="Windows Vista";
  if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1) OSName="Windows XP";
  if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1) OSName="Windows 2000";
  if (window.navigator.userAgent.indexOf("Mac")            !== -1) OSName="Mac/iOS";
  if (window.navigator.userAgent.indexOf("X11")            !== -1) OSName="UNIX";
  if (window.navigator.userAgent.indexOf("Linux")          !== -1) OSName="Linux";
  return OSName;
}
