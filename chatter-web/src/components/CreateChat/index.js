import React from 'react';
import {Container, Search} from "./styles";
import Icon from "../Icon";
import debounce from 'lodash.debounce';
import {Row} from "../../utils/sharedStyles";
import {Avatar, ChatList, Item, UserName} from "../Sidebar/styles";
import {getAvatarPath} from "../../utils/helpers";
import Api from '../../config/axios';

function CreateChat({close, user, ...props}) {
  const [search, setSearch] = React.useState('');
  const [searchDb, setSearchDb] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const debouncedSave = React.useCallback(debounce(nextValue => setSearchDb(nextValue), 1000), []);
  const handleChange = val => {setSearch(val); debouncedSave(val)};

  React.useEffect(() => {
    searchUser();
  }, [searchDb]);
  const searchUser = React.useCallback(async () => {
    if (searchDb.length > 2) {
      const res = await Api.get('/user/search?q=' + searchDb);
      setUsers(res.data);
    }
  }, [searchDb]);

  const onClick = React.useCallback(async (target) => {
    const res = (await Api.get('/chat/conversation-exist/' + target._id)).data;
    if (res.isExist)
      props.setChatId(res.conversationId);
    else {
      const data = (await Api.post('/chat/conversation/' + target._id)).data;
      props.setChatId(data._id);
      props.createChat(data);
    }
    close();
  }, []);

  const renderItem = React.useCallback(item =>
    <Item onClick={() => onClick(item)} key={item._id}>
      <Row>
        <Avatar src={getAvatarPath(item.avatar)} />
        <div>
          <UserName>{item.name}</UserName>
          <div className="subTxt">{item.phone || item.email}</div>
        </div>
      </Row>
    </Item>
  , []);

  return (
    <Container>
      <Row align="center" justify="space-between" className="head">
        <h3>Contacts</h3>
        <div onClick={close}><Icon name="close" /></div>
      </Row>
      <div className="searchContainer">
        <div className="icon"><Icon name="search" size={21} /></div>
        <Search placeholder="Search" value={search} onChange={e => handleChange(e.target.value)} />
      </div>
      <ChatList style={{paddingBottom: 140}}>
        {!search && user.contacts.map(renderItem)}
        {!!users.length && users.map(renderItem)}
      </ChatList>
    </Container>
  )
}

export default CreateChat;
