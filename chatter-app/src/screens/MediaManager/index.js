import React from 'react';
import {Header, Icon} from "../../components";
import {Api} from "../../config";
import {FlatList, Image, Modal} from "react-native";
import {CloseBtn, ItemImage, ListItem, ModalContainer, ModalImage} from "./styles";
import {fixImgPath} from "../../utils/helpers";
import {WINDOW_WIDTH} from "../../config/theme";

const MediaManager = (props) => {
  const [data, setData] = React.useState([]);
  const [source, setSource] = React.useState('');
  const [imgHeight, setImgHeight] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = React.useCallback(async () => {
    const res = await Api.get(`/chat/${props.route.params?.conversationId}/media`);
    setData(res.data.data);
  });

  const closeModal = React.useCallback(() => {
    setModalVisible(false);
    setSource('');
  }, []);

  React.useEffect(() => {
    Image.getSize(fixImgPath(source), (width, height) => {
      const ratio = WINDOW_WIDTH / width;
      setImgHeight(height * ratio);
    });
  }, [source]);

  return (
    <>
      <Header title="Media" showBack />
      <FlatList
        data={data}
        contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row'}}
        renderItem={({item}) =>
          <ListItem onPress={() => {setSource(item.image); setModalVisible(true)}}>
            <ItemImage source={{uri: fixImgPath(item.image)}} />
          </ListItem>
        }
        keyExtractor={item => item._id}
      />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ModalContainer>
          <CloseBtn onPress={closeModal}><Icon name="close" size={30} color="#fff" /></CloseBtn>
          <ModalImage source={{uri: fixImgPath(source)}} style={{height: imgHeight || 100}} />
        </ModalContainer>
      </Modal>
    </>
  )
};

export default MediaManager;
