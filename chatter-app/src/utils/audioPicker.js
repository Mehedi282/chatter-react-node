import DocumentPicker from 'react-native-document-picker';

export default async function () {
  try {
    const res = await DocumentPicker.pick({type: [DocumentPicker.types.audio], copyTo: "documentDirectory"});
    return res[0];
  } catch (e) {
    return {err: e};
  }
}
