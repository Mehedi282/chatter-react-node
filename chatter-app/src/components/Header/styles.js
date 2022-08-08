import styled from 'styled-components/native';
import {Text} from "../index";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {IS_IOS, IS_IPHONE_X} from "../../config/theme";
import FastImage from "react-native-fast-image";
const barHeight = getStatusBarHeight();

const HeaderContainer = styled.View`
  backgroundColor: ${({theme}) => theme.headerBg};
  height: ${90 + (IS_IPHONE_X ? barHeight : IS_IOS ? 0 : -20)};
  padding-top: ${IS_IOS ? barHeight : 0};
`;

const Header = styled.SafeAreaView`
  backgroundColor: ${({theme}) => theme.headerBg};
  height: ${IS_IPHONE_X ? 90 : 70};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
`;

const Title = styled(Text).attrs()`
  color: ${({theme}) => theme.title};
  font-size: 19px;
  margin-left: 20px;
  font-family: Martel-ExtraBold;
`;

const Avatar = styled(FastImage)`
  width: 35px;
  height: 35px;
  border-radius: 20px;
  margin-horizontal: 15px;
  margin-left: 10px;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

const Name = styled(Text)`
  color: ${({theme}) => theme.title};
  font-size: 17px;
`;

const StatusTxt = styled.Text`
  color: ${({theme}) => theme.title};
  opacity: 0.8;
  font-size: 12px;
  margin-top: 2px;
`;

const RightIcon = styled.View`
  right: 10px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  z-index: 999;
`;

const ShadowImg = styled.Image.attrs({resizeMode: 'stretch'})`
  width: 110%;
  height: 15px;
  opacity: 0.3;
  position: absolute;
  top: ${70 + (IS_IOS ? (barHeight + (IS_IPHONE_X?20:0)) : 0)};
  left: -30px;
`;

export {HeaderContainer, Header, Title, Avatar, Content, Name, RightIcon, ShadowImg, StatusTxt};
