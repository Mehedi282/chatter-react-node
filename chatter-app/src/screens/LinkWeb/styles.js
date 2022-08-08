import styled from "styled-components/native";

const MonitorIcon = styled.Image.attrs(({theme}) => ({
  source: theme.mode === 'dark' ? require('../../images/monitor-icon-white.png') : require('../../images/monitor-icon.png')
}))`
  width: 100px;
  height: 100px;
  marginVertical: 15px;
`;

const TitleContainer = styled.View`
  height: 40px;
  margin-top: 25px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
`;

const ListItem = styled.View`
  height: 60px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.border};
`;

const DeleteBtn = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  background-color: #e74c3c;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export {ListItem, MonitorIcon, TitleContainer, DeleteBtn};
