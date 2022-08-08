import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {HeaderContainer, Header, Title, RightIcon, ShadowImg} from './styles';
import Icon from "../Icon";
import {goBack} from "../../config/Navigator";
import {MenuPopup} from "../index";
import {IS_IOS} from "../../config/theme";

const HeaderComp = ({title, chatTitle, menuItems, showBack, onBack, titleStyle}) => {
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <HeaderContainer>
        <Header>
          {chatTitle ?
            chatTitle
            :
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {showBack ? <TouchableOpacity onPress={onBack || goBack} style={{left: 10, top: IS_IOS ? -1 : 0, marginRight: -5}}>
                <Icon size={33} height={40} name="chevron-left-outline" />
              </TouchableOpacity> : null}
              <Title style={titleStyle}>{title}</Title>
            </View>
          }
          {!!menuItems?.length?
            <MenuPopup
              triggerButton={<RightIcon><Icon size={22} name="more-vertical-outline" /></RightIcon>}
              items={menuItems}
              optionsContainerStyle={{maxWidth: 170, marginLeft: -35}}
            />
            : null}
        </Header>
      </HeaderContainer>
      <ShadowImg source={require('../../images/shadow.png')} />
    </View>
  )
};

export default HeaderComp;
