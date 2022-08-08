import styled from "styled-components/native";
import {Dimensions} from "react-native";
import {isIphoneX} from "react-native-iphone-x-helper";
import {IS_IOS, IS_IPHONE_X} from "../../config/theme";

const InputContainer = styled.View`
  background-color: ${({theme}) => theme.inputBg};
  marginHorizontal: 20px;
  borderRadius: 30;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-horizontal: 10px;
`;

const Input = styled.TextInput.attrs(({theme}) => ({placeholderTextColor: theme.gray, color: theme.txt}))`
  marginHorizontal: 10px;
  borderRadius: 30;
  width: ${Dimensions.get('window').width - 150};
  color: ${({theme}) => theme.txt};
`;

const IconContainer = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.mode === 'dark' ? '#465265' : '#fff'};
`;

const ActionsContainer = styled.View`
  height: ${isIphoneX() ? 170 : 120};
  background-color: ${({theme}) => theme.bg2};
  padding-top: 25px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const RowItem = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  align-items: center;
`;

const Btn = styled.View`
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 10px;
`;

const MapHeader = styled.View`
  height: ${IS_IPHONE_X ? 100 : IS_IOS ? 85 : 70};
  flex-direction: row;
  paddingHorizontal: 20px;
  background-color: ${({theme}) => theme.headerBg};
  align-items: center;
  padding-top: ${IS_IPHONE_X ? 30 : IS_IOS ? 10 : 0};
`;

const RefreshBtn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: ${IS_IPHONE_X ? 53 : 23};
`;

const MapFooter = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.bg2};
  height: 70px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export {Input, InputContainer, IconContainer, ActionsContainer, Row, Btn, RowItem, MapHeader, MapFooter, RefreshBtn};
