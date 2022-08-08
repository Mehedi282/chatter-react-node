import React from 'react';
import {TextInput} from "./styles";

function Input({value, onChange, placeholder, ...props}) {
  return <TextInput value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} {...props} />
}

export default Input;
