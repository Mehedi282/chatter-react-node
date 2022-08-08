import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {getTheme} from "../../config/theme";
import {ImgBg, Overlay, Body, Scroll, Row, BackBtn, ListItem, ItemText} from "./styles";
import Text from "../../components/Text";
import {Icon} from "../../components";
import {Api} from "../../config";
import {getAvatarPath} from "../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {blockUser, unblockUser} from "../../redux/actions";

const UserProfile = (props) => {
  const [user, setUser] = React.useState(props.route.params);
  const [conversation, setConversation] = React.useState(props.route.params.conversationId);
  const theme = getTheme();
  const dispatch = useDispatch();
  const blockedList = useSelector(state => state.main.user.data.blocked);
  const isUserBlocked = React.useMemo(() => !!blockedList.find(x => x._id === user._id), [user._id, blockedList]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = React.useCallback(async () => {
    const {_id, avatar, name, conversationId} = props.route.params;
    setUser({avatar, name});
    const res = await Api.get('/user/' + _id);
    if (res.data) setUser(res.data);
    if (!conversationId) {
      const res = await Api.get('/chat/conversation-exist/' + _id);
      if (res.data.conversationId) setConversation(res.data.conversationId);
    }
  }, []);

  const callPhone = React.useCallback(() => {
    if (user.phone) Linking.openURL(`tel:${user.phone}`);
  }, [user.phone]);
  const emailTo = React.useCallback(() => {
    if (user.email) Linking.openURL(`mailto:${user.email}`);
  }, [user.email]);

  const block = React.useCallback(() => {
    if (isUserBlocked)
      dispatch(unblockUser(user));
    else
      dispatch(blockUser(user));
  }, [user, isUserBlocked]);

  return (
    <View style={theme.body}>
      <ImgBg source={getAvatarPath(user.avatar, false, false)} />
      <Overlay/>
      <BackBtn onPress={() => props.navigation.goBack()}>
        <Icon size={33} height={40} name="chevron-left-outline" color="#fff" />
      </BackBtn>
      <Scroll>
        <View style={{height: 270}} />
        <Body>
          <Row>
            <Text size="big" weight="bold">{user.name}</Text>
            <TouchableOpacity onPress={() => conversation && props.navigation.navigate('Chat', {conversation: {_id: conversation}, noInitialData: true})} style={{paddingTop: 7}}><Icon name="paper-plane-outline" size={23} color={theme.primary} /></TouchableOpacity>
          </Row>
          <ListItem onPress={callPhone}>
            <Icon size={20} name="phone-outline" />
            <ItemText>{user.phone || 'no phone'}</ItemText>
          </ListItem>
          <ListItem onPress={emailTo}>
            <Icon size={20} name="email-outline" />
            <ItemText>{user.email || 'no email'}</ItemText>
          </ListItem>
          <ListItem onPress={() => props.navigation.navigate('MediaManager', {conversationId: conversation})}>
            <Icon size={20} name="image-outline" />
            <ItemText>Media</ItemText>
          </ListItem>
          <ListItem onPress={block}>
            <Icon size={20} name="slash-outline" />
            <ItemText>{isUserBlocked ? 'Unblock' : 'Block'} {user.name}</ItemText>
          </ListItem>
        </Body>
      </Scroll>
    </View>
  )
};

export default UserProfile;
