import React from 'react';
import {Icon} from 'react-native-eva-icons';
import {getTheme} from "../config/theme";

const IconComp = ({name, size, color, themeColor, height}) => {
  const theme = getTheme();

  return <Icon name={name} width={size} height={height || size} fill={themeColor ? theme[themeColor] :color || theme.txt} />;
};

export default IconComp;
