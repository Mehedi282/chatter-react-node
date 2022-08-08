import GetLocation from 'react-native-get-location'

export default async function () {
  try {
    const loc = GetLocation.getCurrentPosition({enableHighAccuracy: true,timeout: 15000});
    return loc;
  } catch (e) {
    return {err: error};
  }
}
