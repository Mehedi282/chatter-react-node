import React from 'react';
import {Linking, TouchableOpacity} from "react-native";
import MapView from "react-native-maps";

const LocationMessage = ({location, messagePosition}) => {
  const openMaps = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
      android: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
    });
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
      });
  };

  return (
    <TouchableOpacity
      onPress={openMaps}
      style={{
        backgroundColor: 'gray',
        width: '70%',
        height: 250,
        marginBottom: 10,
        borderRadius: 25,
        overflow: 'hidden',
        borderBottomLeftRadius: messagePosition === 'left' ? 0 : 25,
        borderBottomRightRadius: messagePosition !== 'left' ? 0 : 25
      }}>
      <MapView
        style={{top: 0, left: 0, right: 0, bottom: 0, position: 'absolute'}}
        region={{latitude: location.latitude, longitude: location.longitude, longitudeDelta: 0.09, latitudeDelta: 0.04}}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <MapView.Marker coordinate={location}/>
      </MapView>
    </TouchableOpacity>
  );
};

export default LocationMessage;
