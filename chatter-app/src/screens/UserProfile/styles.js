import React from 'react';
import styled from "styled-components/native";
import {IS_IPHONE_X, WINDOW_HEIGHT} from "../../config/theme";
import {Text} from "../../components";
import FastImage from "react-native-fast-image";

const ImgBg = styled(FastImage).attrs({resizeMode: 'cover'})`
  width: 100%;
  height: 300px;
  position: absolute
`;

const Overlay = styled.View`
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #000;
  opacity: 0.3
`;

const Body = styled.View`
  background-color: ${({theme}) => theme.bg2};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 25px;
  padding-top: 15px;
  min-height: ${WINDOW_HEIGHT - 200}
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const BackBtn = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: ${IS_IPHONE_X ? 45 : 25};
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.TouchableOpacity`
  height: 60px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #EBEBEB;
`;

const ItemText = styled(Text).attrs({noFont: true})`
  margin-left: 15px;
`;

const FooterItem = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e74c3c;
  opacity: 0.8;
`;

const Scroll = styled.ScrollView``;

export {ImgBg, Overlay, Body, Scroll, Row, BackBtn, ListItem, ItemText, FooterItem};
