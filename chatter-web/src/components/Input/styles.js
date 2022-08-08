import styled from "styled-components";

export const TextInput = styled.input.attrs(({type}) => ({type: type || 'text'}))`
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-bottom: 2px solid #848484;
  font-size: 17px;
  padding: 10px 0;
  width: 350px;
  margin-top: 25px;
  &:focus {
    outline: none;
  }
`;
