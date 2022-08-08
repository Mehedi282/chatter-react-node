import React from 'react';
import {Menu, MenuTrigger, MenuOptions, MenuOption} from "react-native-popup-menu";
import {getTheme} from "../../config/theme";

const MenuPopup = ({items, triggerButton, optionsContainerStyle}) => {
  const theme = getTheme();

  return (
    <Menu>
      <MenuTrigger>{triggerButton}</MenuTrigger>
      <MenuOptions optionsContainerStyle={optionsContainerStyle}>
        {items?.map(item =>
          <MenuOption
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
              justifyContent: 'center',
              paddingHorizontal: 15,
              backgroundColor: theme.bg2
            }}
            customStyles={{optionText: {color: theme.txt}}}
            onSelect={() => item.onPress(item.value)} key={item.value} text={item.label} value={item.value}
          />
        )}
      </MenuOptions>
    </Menu>
  )
};

export default MenuPopup;
