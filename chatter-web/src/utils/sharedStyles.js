import styled from "styled-components";

export const Logo = styled.img.attrs({src: require('../images/logo.png')})`
  width: 100px;
`;

export const MocUp = styled.img.attrs({src: require('../images/mocup.png')})`
  width: 600px;
`;
export const MockUpContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const MockUpSource = styled.img.attrs({src: require('../images/mockupSource.png')})`
  top: 17px;
  width: 265px;
  height: 577px;
  position: absolute;
  border-radius: 35px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({align}) => align || 'flex-start'};
  justify-content: ${({justify}) => justify || 'flex-start'};
`;

export const Button = styled.a`
  width: ${({width}) => width ? width + 'px' : 'auto'};
  padding: 16px 66px;
  background-color: #4E9F3D;
  color: #fff;
  border-radius: 4px;
  font-size: 18px;
  border: 1px solid #4E9F3D;
  transition: all 0.3s;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #4E9F3D;
  }
`;

export const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({vertical}) => vertical || 'flex-start'};
`;

export const Divider = styled.div`
  width: 130px;
  height: 2px;
  background-color: #333;
`;
