import styled from "styled-components/native";
import React from "react";
import {WINDOW_WIDTH} from "../../config/theme";

export const PLAY_WIDTH = 230;

export const Container = styled.View`
  margin-bottom: 10px;
  padding: 7px;
  padding-bottom: 10px;
  width: 300px;
  ${({theme, active}) => active ? `
    right: ${-(WINDOW_WIDTH - 310)};
    background-color: ${theme.primary};
    borderBottomLeftRadius: 25px;
    borderTopLeftRadius: 25px;
    borderBottomRightRadius: 0;
  ` : `
    left: 10px;
    borderBottomRightRadius: 25px;
    borderTopRightRadius: 25px;
    borderBottomLeftRadius: 0;
    backgroundColor: ${theme.mode === 'dark' ? theme.bg2 : '#f4f7fe'};
  `}
`;

export const Wrapper = styled.View`
  flex-direction: row;
`;

export const AvatarContainer = styled.View`
  align-self: flex-end;
  left: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

export const Btn = styled.TouchableOpacity`
  padding: 10px;
`;

export const StatusContainer = styled.TouchableOpacity.attrs({activeOpacity: 1})`
  width: ${PLAY_WIDTH}px;
  height: 8px;
  margin-right: 15px;
`;

export const ViewBar = styled.View`
  height: 5px;
  background-color: ${({theme, white}) => white ? 'rgba(255,255,255,0.5)' : theme.border};
`;

export const ViewBarPlay = styled.View`
  height: 5px;
  background-color: ${({theme, white}) => white ? '#fff' : theme.primary};
`;

export const DurationTxt = styled.Text`
  color: ${({theme, white}) => white ? '#fff' : theme.txt};
  font-size: 12px;
  position: absolute;
  left: 57px;
  top: 40px;
`;
