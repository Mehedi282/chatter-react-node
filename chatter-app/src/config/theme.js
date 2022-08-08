import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {isIphoneX} from 'react-native-iphone-x-helper';

export const IS_IOS = Platform.OS === 'ios';
export const IS_IPHONE_X = isIphoneX();
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const theme = {
  dark: {
    mode: 'dark',
    txt: '#fff',
    inputBg: '#242a34',
    bg: '#121212',
    bg2: '#242a34',
    headerBg: '#121212',
    title: '#fff',
    primary: '#4E9F3D',
    secondary: '#175B4A',
    gray: '#848484',
    border: '#3b3b3b',
    danger: '#e74c3c'
  },
  light: {
    mode: 'light',
    txt: '#000',
    inputBg: '#f1f3f0',
    bg: '#fafdf6',
    bg2: '#fff',
    headerBg: '#fff',
    title: '#000',
    primary: '#4E9F3D',
    secondary: '#175B4A',
    gray: '#848484',
    border: '#EBEBEB',
    danger: '#e74c3c'
  },
  body: {
    flex: 1
  }
};

const sharedStyles = {
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const ThemeContainer = (props) => {
  const scheme = useColorScheme();

  return (
    <ThemeProvider theme={scheme === 'dark' ? theme.dark : theme.light}>
      {props.children}
    </ThemeProvider>
  )
};

const getTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? theme.dark : theme.light;
};

export {theme, ThemeContainer, getTheme, sharedStyles}
