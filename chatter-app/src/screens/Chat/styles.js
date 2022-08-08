import styled from "styled-components/native";

const bubbleCommonStyle = {
  marginBottom: 10,
  padding: 7,
  paddingBottom: 5
};

const LoadBtn = styled.TouchableOpacity.attrs({activeOpacity: 0.7})`
  padding-vertical: 6px;
  background-color: ${({theme}) => theme.primary};
  width: 130px;
  align-self: center;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 3px;
  height: 35px;
  justify-content: center;
  margin-top: 15px;
`;

const LoadBtnTxt = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export {bubbleCommonStyle, LoadBtn, LoadBtnTxt};
