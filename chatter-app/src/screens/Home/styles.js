import styled from "styled-components/native";
import {IS_IOS, IS_IPHONE_X, WINDOW_WIDTH} from "../../config/theme";
import FastImage from 'react-native-fast-image';

const FloatButton = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  position: absolute;
  right: 25px;
  bottom: ${IS_IPHONE_X ? 30 : 25};
  background-color: ${({theme}) => theme.primary};
  opacity: ${({disabled}) => disabled ? 0.7 : 1};
  justify-content: center;
  align-items: center;
`;

const Item = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  flex-direction: row;
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
  padding-horizontal: 20px;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled(FastImage)`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  font-size: 17px;
  margin-bottom: 7px;
  color: ${({theme, unseen}) => !unseen ? theme.title : theme.primary};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
`;

const MessageText = styled.Text.attrs({numberOfLines: 1})`
  font-size: 14px;
  color: ${({theme}) => theme.gray};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
  width: ${({withIcon}) => !withIcon ? WINDOW_WIDTH - 160 : 'null'};
  margin-left: ${({withIcon}) => withIcon ? 4 : 0};
  ${({withIcon}) => !withIcon ? `
    position: absolute;
    top: 27px;
  ` : ''
  }
`;

const Time = styled.Text`
  color: ${({theme}) => theme.gray};
  font-size: 13px;
`;

const UnseenCount = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
`;

export const ItemRight = styled.View`
  margin-top: 10px;
  align-self: flex-end;
`;

export const Empty = styled.View`
  margin-top: -60px;
  margin-bottom: 25px;
`;

const ModalContent = styled.View`
  background-color: ${({theme}) => theme.bg};
  flex: 1;
`;

const CreateHeader = styled.View`
  background-color: ${({theme}) => theme.bg};
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
`;
const HeaderShadow = styled.Image.attrs({source: require('../../images/shadow.png'), resizeMode: 'stretch'})`
  position: absolute;
  top: ${({noOffset}) => IS_IPHONE_X ? noOffset ? 100 : 143 : IS_IOS ? noOffset ? 90 : 116 : noOffset ? 57 : 107};
  left: -100px;
  opacity: 0.3;
`;

const Row = styled.View`
  flex-direction: row;
  padding-horizontal: 25px;
  padding-top: ${IS_IOS ? 7 : 9};
  margin-bottom: ${IS_IOS ? 20 : 0};
`;

const Msg = styled.View`
  flex-direction: row;
  align-items: center;
  opacity: 0.6;
`;

const LeftText = styled.Text`
  color: ${({theme}) => theme.gray};
  font-size: 16px;
`;

const Input = styled.TextInput.attrs(({theme}) => ({placeholderTextColor: theme.gray, color: theme.txt}))`
  margin-left: ${IS_IOS ? 15 : 7};
  width: 90%;
  font-size: 16px;
  top: ${!IS_IOS ? -13 : 0};
`;

const UserItem = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  padding-horizontal: 15px;
  flex-direction: row;
  height: 70px;
  alignItems: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
`;

export const RemoveBtn = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  background-color: ${({theme}) => theme.danger};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 15px;
`;

export const Checked = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${({theme}) => theme.primary};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -2px;
  right: -5px;
`;

export const GroupInfo = styled.View`
  flex-direction: row;
  margin-top: 25px;
  margin-horizontal: 15px;
  align-items: center;
`;

export const NameInput = styled.TextInput.attrs(({theme}) => ({placeholder: 'Group Name', placeholderTextColor: theme.gray}))`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
  color: ${({theme}) => theme.txt};
  height: 45px;
  width: 60%;
`;

export const ImagePicker = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  margin-right: 15px;
  background-color: ${({theme}) => theme.mode === 'dark' ? theme.bg2 : '#ddd'};
  justify-content: center;
  align-items: center;
`;

export const GroupImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;


export {FloatButton, Item, Avatar, UserName, MessageText, Time, CreateHeader, HeaderShadow, LeftText, Input, Row, UserItem, ModalContent, Msg, UnseenCount};
