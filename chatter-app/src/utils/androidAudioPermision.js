import {PermissionsAndroid, Platform} from "react-native";

export default async function checkPermission() {
  if (Platform.OS !== 'android')
    return Promise.resolve(true);
  let result;
  try {
    result = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ]);
  } catch(error) {
    console.error('failed getting permission, result:', result);
  }
  return (result === true || result === PermissionsAndroid.RESULTS.GRANTED || !Object.values(result).find(x => x !== 'granted'));
}
