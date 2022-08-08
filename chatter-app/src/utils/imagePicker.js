import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

async function getImageFromLibrary(opts) {
  try {
    const result = await launchImageLibrary(opts);
    return result.assets[0];
  } catch (e) {
    return e;
  }
}

async function getImageFromCamera(opts) {
  try {
    const result = await launchCamera(opts);
    return result.assets[0];
  } catch (e) {
    return e;
  }
}

export {getImageFromLibrary, getImageFromCamera}
