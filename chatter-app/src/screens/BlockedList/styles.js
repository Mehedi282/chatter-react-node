import styled from "styled-components/native";

export const ListItem = styled.View`
  padding-horizontal: 15px;
  height: 65px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-color: ${({theme}) => theme.border};
  border-bottom-width: 1px;
`;

export const ItemLeft = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 30px;
  margin-right: 15px;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px;
  padding-vertical: 5px;
  border-width: 1px;
  border-color: ${({theme}) => theme.gray};
  border-radius: 5px;
`;

export const BtnTxt = styled.Text`
  color: ${({theme}) => theme.gray};
  font-size: 12px;
`;
