import React from 'react';
import {SpinnerCircularSplit} from 'spinners-react';

function Spinner({size, color}) {
  return <SpinnerCircularSplit size={size || 70} color={color} />
}

export default Spinner;
