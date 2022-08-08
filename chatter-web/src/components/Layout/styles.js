import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({mode}) => mode === 'dark' ? '#242a34' : 'transparent'};
`;

export const Corner = styled.img.attrs({src: require('../../images/corner.png')})`
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
`;
export const CornerBot = styled.img.attrs({src: require('../../images/corner.png')})`
  width: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: rotate(180deg);
`;

export const Content = styled.div`
  width: 93%;
  height: 92%;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 22px -1px rgb(0 0 0 / 10%);
`;
