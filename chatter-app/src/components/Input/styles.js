import styled from "styled-components/native";
import {Hoshi} from 'react-native-textinput-effects';
import React from "react";

const InputRaw = styled(Hoshi).attrs(({theme}) => ({
  borderColor: theme.primary,
  borderHeight: 2,
  inputPadding: 0,
  labelStyle: {
    marginTop: -10
  },
  inputStyle: {
    bottom: -3,
    fontWeight: '400',
    color: theme.txt,
  },
}))``;

export {InputRaw};
