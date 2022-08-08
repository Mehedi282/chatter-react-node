import styled from "styled-components/native";

const Avatar = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;
  margin-bottom: 15px;
`;
const AvatarContainer = styled.View`
  width: 130px;
  height: 130px;
`;

const Head = styled.View`
  align-items: center;
  margin-bottom: 45px;
`;

const IconBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 30px;;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
  position: absolute;
  right: 5px;
  bottom: -5px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const InputContainer = styled.View`
  width: 80%;
  top: -40px;
  margin-left: 10px;
`;

const LogoutBtn = styled.Text`
  margin-top: 30px;
  text-align: center;
  color: ${({theme}) => theme.danger};
`;

export {Avatar, Head, IconBtn, Row, InputContainer, AvatarContainer, LogoutBtn};
