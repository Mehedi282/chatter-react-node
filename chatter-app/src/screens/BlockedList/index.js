import React from 'react';
import {Header, Text} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {FlatList} from "react-native";
import {Avatar, BtnTxt, Button, ItemLeft, ListItem} from "./styles";
import {getAvatarPath} from "../../utils/helpers";
import {unblockUser} from "../../redux/actions";

function BlockedList(props) {
  const blocked = useSelector(state => state.main.user.data.blocked);
  const dispatch = useDispatch();

  return (
    <>
      <Header showBack title="Blocked Contacts" />
      <FlatList
        data={blocked}
        renderItem={({item}) =>
          <ListItem>
            <ItemLeft>
              <Avatar source={getAvatarPath(item.avatar)} />
              <Text noFont>{item.name}</Text>
            </ItemLeft>
            <Button onPress={() => dispatch(unblockUser(item))}>
              <BtnTxt>Unblock</BtnTxt>
            </Button>
          </ListItem>
        }
        keyExtractor={item => item._id}
        contentContainerStyle={{paddingTop: 15}}
      />
    </>
  )
}

export default BlockedList;
