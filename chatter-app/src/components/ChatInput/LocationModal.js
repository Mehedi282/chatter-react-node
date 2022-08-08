import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-maps';
import getLocation from "../../utils/getLocation";
import {MapHeader, MapFooter, RefreshBtn} from './styles';
import {Icon, Text} from "../index";

const LocationModal = ({visible, close, onSend}) => {
  const [location, setLocation] = React.useState({latitude: '', longitude: ''});

  React.useEffect(() => {
    if (visible) fetchLocation();
  }, [visible]);

  const fetchLocation = React.useCallback(async () => {
    const loc = await getLocation();
    if (loc && !loc.err)
      setLocation({latitude: loc.latitude, longitude: loc.longitude})
  }, []);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <View style={{flex: 1}}>
        <MapHeader>
          <TouchableOpacity onPress={close} style={{marginRight: 15, top: -1}}>
            <Icon name="close" size={28} />
          </TouchableOpacity>
          <Text size="title" noFont weight="bold">Share Location</Text>
          <RefreshBtn onPress={fetchLocation}><Icon name="refresh" size={25} /></RefreshBtn>
        </MapHeader>
        {(visible && location.latitude) ?
        <View style={{flex: 1}}>
          <MapView
            style={{flex: 1}}
            region={{latitude: location.latitude, longitude: location.longitude, longitudeDelta: 0.09, latitudeDelta: 0.04}}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <MapView.Marker coordinate={location}/>
          </MapView>
        </View> : null
        }
        <MapFooter onPress={() => onSend(location)}>
          <Text noFont style={{marginRight: 5}}>Send current location</Text>
          <Icon name="paper-plane" size={25} />
        </MapFooter>
      </View>
    </Modal>
  )
};

export default LocationModal;
