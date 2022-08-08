import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 300px;
  flex-basis: 300px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  background-color: ${({theme}) => theme.bg};
  border-left: 1px solid ${({theme}) => theme.border};
  text-align: center;
  padding: 20px;
  padding-top: 100px;
  color: #a8a8a8;
  .title {
    font-size: 20px;
    margin-bottom: 15px;
    color: ${({theme}) => theme.txt};
  }
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-bottom: 25px;
`;

export const Close = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  cursor: pointer;
  svg {
    fill: ${({theme}) => theme.txt};
  }
`;
