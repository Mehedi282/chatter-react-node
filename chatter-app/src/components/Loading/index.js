import React from 'react';
import {View} from "react-native";
import styled from "styled-components/native";

const Spinner = styled.ActivityIndicator.attrs(({theme}) => ({color: theme.primary, size: 'large'}))``;

function Loading() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Spinner />
    </View>
  )
}

export default Loading;
