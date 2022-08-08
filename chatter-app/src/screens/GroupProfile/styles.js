import styled from "styled-components/native";

export const Bar = styled.View`
  height: 15; 
`;

export const Head = styled.View`
  align-items: center;
  margin-top: 80px; 
  margin-bottom: 20px;
`;

export const LeftBtn = styled.TouchableOpacity`
  padding: 5px;
  padding-top: 0;
  left: 5px;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RightBtn = styled.View`
  padding: 5px;
  padding-top: 10px;
  right: 5px;
`;

export const ListHeader = styled.View`
  padding-horizontal: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
  height: 40px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding-horizontal: 15px;
  border-bottom-color: ${({theme}) => theme.border};
`;

export const ListLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ListAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const ExitBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.border};
`;

export const NameInput = styled.TextInput.attrs({autoFocus: true})`
  font-size: 23px;
  margin-right: 15px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const headerContainer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: 15
};

export const titleStyle = {
  fontSize: 17,
  marginLeft: 60
};
