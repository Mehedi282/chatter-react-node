import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  z-index: 4;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: ${({theme}) => theme.bg};
  padding: 15px 0;
  .subTxt {
    opacity: 0.7;
  }
  svg {
    fill: ${({theme}) => theme.txt};
  }
  .searchContainer {
    position: relative;
  }
  .icon {
    position: absolute;
    top: 21px;
    left: 33px
  }
`;

export const Search = styled.input.attrs({type: 'text'})`
  background-color: ${({theme}) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  border: none;
  outline: none;
  width: calc(100% - 50px);
  margin-left: 25px;
  margin-top: 10px;
  height: 45px;
  padding: 0 10px;
  padding-left: 35px;
  border-radius: 5px;
  font-size: 15px;
  color: ${({theme}) => theme.txt};
  &::placeholder {
    color: ${({theme}) => theme.txt};
  }
`;
