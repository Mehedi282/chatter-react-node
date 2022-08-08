import React from 'react';
import {View, ScrollView, Modal, Image} from "react-native";
import {Button, Header, Icon, Text} from "../../components";
import QRCodeScanner from "react-native-qrcode-scanner";
import {DeleteBtn, ListItem, MonitorIcon, TitleContainer} from './styles';
import {useSelector} from "react-redux";
import {qrLogin} from "../Home/socket";

const LinkWeb = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const user = useSelector(state => state.main.user.data);

  const onScan = React.useCallback(async (secret) => {
    setModalVisible(false);
    const data = {id: user._id, secret: secret.data};
    qrLogin(data);
  }, [user]);

  return (
    <>
      <Header title="Link Web" showBack />
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <View style={{alignItems: 'center', marginBottom: 15}}>
          <MonitorIcon />
          <Text size="big" weight="bold">Use Chatter on Web</Text>
        </View>
        <Button title="Scan QR Code" onPress={() => setModalVisible(true)} />
        <TitleContainer>
          <Text noFont size="medium">Linked Devices</Text>
        </TitleContainer>
        <ScrollView>
          {user.devices.map((item, i) =>
            <ListItem key={i}>
              <Text>{item}</Text>
            </ListItem>
          )}
        </ScrollView>
      </View>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={{flex: 1}}>
          <Header title="Scan QR Code" noFont showBack onBack={() => setModalVisible(false)} titleStyle={{fontSize: 18}} />
          <QRCodeScanner onRead={onScan} />
        </View>
      </Modal>
    </>
  )
};

export default LinkWeb;
