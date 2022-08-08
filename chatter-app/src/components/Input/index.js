import React from 'react';
import {View} from 'react-native';
import {InputRaw} from "./styles";

const Input = ({value, onChange, label, ...props}) => {
  return (
    <View style={{marginTop: 25}}>
      <InputRaw
        value={value}
        label={label}
        onChangeText={onChange}
        {...props}
      />
    </View>
  );
};

export default Input;
