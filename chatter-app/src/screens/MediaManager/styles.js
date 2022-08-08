import styled from "styled-components/native";
import {WINDOW_WIDTH} from "../../config/theme";

const itemSize = WINDOW_WIDTH / 3;

export const ListItem = styled.TouchableOpacity`
  width: ${itemSize}px;
  height: ${itemSize};
  align-items: center;
  justify-content: center;
`;

export const ItemImage = styled.Image`
  width: 95%;
  height: 95%;
`;

export const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 40px;
  z-index: 9;
`;

export const ModalContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #000;
  justify-content: center;
`;

export const ModalImage = styled.Image`
  width: ${WINDOW_WIDTH}
`;
