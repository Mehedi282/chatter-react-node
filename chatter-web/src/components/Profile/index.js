import React from 'react';
import {Avatar, ProfileContainer, Close} from "./styles";
import Api from '../../config/axios';
import {getAvatarPath} from "../../utils/helpers";
import {Icon} from "../index";

function Profile({id, ...props}) {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = React.useCallback(async () => {
    const res = await Api.get('/user/' + id);
    setData(res.data);
  }, [id]);

  return (
    <ProfileContainer>
      <Close onClick={() => props.setProfile(0)}><Icon name="close" size={30} /></Close>
      <Avatar src={getAvatarPath(data.avatar)} />
      <div className="title">{data.name}</div>
      <div>{data.phone}</div>
      <div>{data.email}</div>
    </ProfileContainer>
  )
}

export default Profile;
