import React from 'react';
import {BtnTx, Btn} from "./styled";

const Button = ({title, onPress, style}) => <Btn onPress={onPress} style={style}><BtnTx>{title}</BtnTx></Btn>;

export default Button;
