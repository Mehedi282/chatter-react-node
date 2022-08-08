import styled from "styled-components/native";

const Btn = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`
  background-color: ${({theme}) => theme.primary};
  height: 45px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 100%; 
`;

const BtnTx = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export {Btn, BtnTx};
