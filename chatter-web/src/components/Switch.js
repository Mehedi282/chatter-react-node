import SwitchComp from "react-switch";
import styled from "styled-components";

const Switch = styled(SwitchComp).attrs(({checked, onChange, theme}) => ({
  checked,
  onChange,
  height: 25,
  onColor: theme.primary,
  checkedIcon: false,
  uncheckedIcon: false
}))``;

export default Switch;
