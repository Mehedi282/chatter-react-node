import styled from 'styled-components/native';
import {IS_IOS} from "../../config/theme";

const Text = styled.Text.attrs({allowFontScaling: false})`
  color: ${({theme, color, primary = false}) => color ? theme[color] || color : primary ? theme.primary : theme.txt};
  ${({weight}) => IS_IOS ? `font-weight: ${weight || '600'}` : ''};
  ${({noFont, weight, ...props}) => {
    const name = weight === '900' ? 'Martel-ExtraBold' : weight === '700' ? 'Martel-Bold' : weight === '400' ? 'Martel-Regular' : 'Martel-SemiBold';
    return !noFont ? `font-family: ${IS_IOS ? 'Martel' : name};` : '';
}}
  ${({align}) => (align ? `text-align: ${align};` : '')}
  ${({size}) => (size ? `font-size: ${size === 'big' ? 25 : size === 'large' ? 23 : size === 'medium' ? 18 : size === 'small' ? 16 : 17};` : '')}
  ${({isUppercase}) => (isUppercase ? 'text-transform: uppercase;' : '')};
`;

export default Text;
