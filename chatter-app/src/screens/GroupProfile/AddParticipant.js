import React from 'react';
import {Modal, View, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import {CreateHeader, HeaderShadow, LeftText, Input, Row, Avatar, UserItem, UserName, MessageText, ModalContent, Checked, FloatButton} from '../Home/styles';
import debounce from 'lodash.debounce';
import {Icon, Text} from "../../components";
import {theme} from "../../config/theme";
import {Api} from "../../config";
import {getAvatarPath} from "../../utils/helpers";
import {useSelector} from "react-redux";

const AddParticipantsModal = ({visible, close, currentParticipants, addParticipants}) => {
  const [search, setSearch] = React.useState('');
  const [searchDb, setSearchDb] = React.useState('');
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const contacts = useSelector(state => state.main.user.data.contacts);

  React.useEffect(() => {
    if (search.length > 1) {
      setData([]);
      searchData(searchDb);
    }
  }, [searchDb]);
  const searchData = React.useCallback(async (Search = search) => {
    const res = await Api.get('/user/search?q=' + Search);
    setData(res.data);
  }, []);
  const debouncedSave = React.useCallback(debounce(nextValue => setSearchDb(nextValue), 1000), []);
  const handleChange = val => {setSearch(val); debouncedSave(val)};

  React.useEffect(() => {
    if (!visible) {
      searchData([]);
      setSelected([]);
      setSearch('');
      setSearchDb('');
    }
  }, [visible]);

  const onItemClick = React.useCallback((item) => {
    if (selected.find(x => x._id === item._id))
      setSelected(state => state.filter(x => x._id !== item._id));
    else
      setSelected(state => [...state, item]);
  }, [selected]);

  const renderItem = React.useCallback(({item}, isGroup) => <UserItem key={item._id} onPress={() => onItemClick(item)}>
    <View style={{width: 40, height: 40, marginRight: 15}}>
      <Avatar source={getAvatarPath(item.avatar)} style={{width: 40, height: 40}} />
      {isGroup ? <Checked><Icon name="checkmark-outline" size={18} color="#fff" /></Checked> : null}
    </View>
    <View style={{top: -7}}>
      <UserName>{item.name}</UserName>
      <MessageText>{item.phone || item.email}</MessageText>
    </View>
  </UserItem>, [selected]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <ModalContent>
        <SafeAreaView>
          <CreateHeader>
            <TouchableOpacity onPress={close} style={{padding: 5, top: -1}}><Icon name="chevron-left-outline" size={28} /></TouchableOpacity>
            <Text size="small">Add Participants</Text>
          </CreateHeader>
        </SafeAreaView>
        <Row>
          <View style={{top: 3}}>
            <LeftText><Icon name="search" size={20} themeColor="gray"/></LeftText>
          </View>
          <Input placeholder="Type a name, phone or email" value={search} onChangeText={handleChange}/>
        </Row>
        <HeaderShadow/>
        <View style={theme.body}>
          {selected.length ?
            <View>
              <Text style={{margin: 15}}>Participants</Text>
              {selected.map(item => renderItem({item}, true))}
            </View> : null
          }
          <FlatList
            data={(searchDb ? data : contacts)?.filter(x => !selected.find(y => (x._id === y._id)) && !currentParticipants.includes(x._id))}
            renderItem={renderItem}
            keyExtractor={(x, i) => i.toString()}
            contentContainerStyle={{paddingTop: 25}}
          />
        </View>
        {selected.length > 0 ? <FloatButton onPress={() => addParticipants(selected)}><Icon name='checkmark' size={30} color="#fff" /></FloatButton> : null}
      </ModalContent>
    </Modal>
  )
};

export default AddParticipantsModal;
