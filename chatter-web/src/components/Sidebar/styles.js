import styled from "styled-components";

export const SidebarContainer = styled.div`
  background-color: ${({theme}) => theme.bg};
  width: 340px;
  flex-basis: 340px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  padding: 15px 0;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  color: ${({theme}) => theme.txt};
  border-right: 1px solid ${({theme}) => theme.border};
  position: relative;
  .head {
    padding: 0 25px;
    color: ${({theme}) => theme.txt};
    svg {
      fill: ${({theme}) => theme.txt}
    }
    div {
    cursor: pointer;
    }
  }
`;

export const ChatList = styled.div`
  margin-top: 25px;
  height: 100%;
  overflow-y: auto;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
  border-bottom: 1px solid ${({theme}) => theme.border};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  padding: 0 25px;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  margin-right: 15px;
`;

export const UserName = styled.span`
  font-size: 16px;
  margin-bottom: 7px;
  display: block;
  color: ${({theme, unseen}) => !unseen ? theme.title : theme.primary};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 122px;
`;

export const MessageText = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.gray};
  font-weight: ${({unseen}) => !unseen ? 400 : 600};
  height: 16px;
  overflow: hidden;
  width: 175px;
`;

export const Time = styled.span`
  color: ${({theme}) => theme.gray};
  font-size: 12px;
  position: absolute;
  right: 25px;
  top: 15px;
`;

export const Msg = styled.div`
  display: flex;
  align-items: center;
  opacity: ${({theme}) => theme.mode === 'light' ? 0.6 : 1};
`;

export const UnseenCount = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 13px;
  margin-top: 20px;
  color: #fff;
`;

export const ItemRight = styled.div`
  margin-top: 20px;
  align-self: flex-end;
`;
