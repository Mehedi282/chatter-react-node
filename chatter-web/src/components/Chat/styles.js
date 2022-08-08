import styled  from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.bg};
`;
export const ChatContent = styled.div`
  height: calc(100% - 100px);
  & > div {
    height: 100%;
  }
`;

export const MapContainer = styled.div`
  background-color: gray;
  width: 607px;
  height: 250px;
  margin-bottom: 10px;
  border-radius: 25px;
  overflow: hidden;
  @media screen and (max-width: 1100px) {
    width: 80%
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 90px;
  border-bottom: 1px solid ${({theme}) => theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  color: ${({theme}) => theme.txt};
  font-size: 22px;
  & > div {
    cursor: pointer;
  }
`;
export const HeaderAvatar = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  border-radius: 50px;
`;
export const StatusTxt = styled.div`
  color: ${({theme}) => theme.title};
  opacity: 0.8;
  font-size: 12px;
  margin-top: 2px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;
export const InputContainer = styled.div`
  background-color: ${({theme}) => theme.inputBg};
  margin: 0 20px;
  border-radius: 30px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px;
  margin-top: 9px;
`;
export const Input = styled.input.attrs(({theme}) => ({placeholderTextColor: theme.gray, color: theme.txt, type: 'text'}))`
  margin: 0 10px;
  border-radius: 30px;
  width: 90%;
  color: ${({theme}) => theme.txt};
  border: none;
  background: transparent;
  outline: none;
`;
export const IconBtn = styled.div`
  position: absolute;
  right: 95px;
  top: 22px;
  cursor: pointer;
  transform: rotate(280deg);
`;
export const IconContainer = styled.div`
  cursor: pointer;
  width: 38px;
  height: 38px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.mode === 'dark' ? '#465265' : '#fff'};
`;
export const ActionsContainer = styled.div`
  height: 120px;
  background-color: ${({theme}) => theme.bg2};
  padding-top: 25px;
  position: absolute;
  bottom: 50px;
  width: 500px;
  right: 60px;
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  display: flex;
  z-index: 2;
  color: ${({theme}) => theme.txt};
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
export const RowItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
export const Btn = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 10px;
`;
export const MessageText = styled.div`
  color: ${({theme, right}) => right ? '#fff' : theme.txt};
  margin: 13px;
  font-size: 14px;
  margin-left: 17px;
`;
export const LoadBtn = styled.div`
  cursor: pointer;
  padding: 8px;
  background-color: ${({theme}) => theme.primary};
  width: 130px;
  margin-bottom: 15px;
  border-radius: 3px;
  height: 35px;
  text-align: center;
  margin-top: 15px;
  color: #fff;
  font-size: 14px;
  align-self: center;
`;
